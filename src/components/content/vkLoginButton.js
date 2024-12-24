import React, { useEffect } from 'react';
import axios from 'axios';


export const VKLoginButton = () => {

    useEffect(() => {
        // Подключаем VK SDK только при монтировании компонента
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js';
        script.async = true;
        document.body.appendChild(script);

        function onSuccessHandler (payload) {
            console.log(payload)

            // Теперь отправляем код на сервер для дальнейшей обработки
            axios.post('https://maksimshipilov.ru/api/vk/callback', { access_token: payload["access_token"] })
                .then((response) => {
                    console.log('Авторизация прошла успешно:', response.data);
                    // Здесь можно перенаправить пользователя или показать уведомление
                })
                .catch((error) => {
                    console.error('Ошибка авторизации:', error);
                    // Перенаправление на страницу ошибки или другое поведение
                });
        }

        function onErrorHandler(payload) {
            console.error(payload)
        }

        script.onload = () => {
            if ('VKIDSDK' in window) {
                const VKID = window.VKIDSDK;

                // Инициализация VK SDK
                VKID.Config.init({
                    app: 52878284,
                    redirectUrl: 'https://maksimshipilov.ru/',
                    responseMode: VKID.ConfigResponseMode.Callback,
                    source: VKID.ConfigSource.LOWCODE,
                    scope: '', // Заполните нужными доступами по необходимости
                });

                const oAuth = new VKID.OAuthList();

                // Рендерим кнопку и обрабатываем события
                oAuth.render({
                    container: document.getElementById('vk-login-container'), // Создаем контейнер для кнопки
                    scheme: 'dark',
                    styles: {
                        borderRadius: 50,
                    },
                    oauthList: ['vkid', 'ok_ru', 'mail_ru'],
                })
                    .on(VKID.WidgetEvents.ERROR, vkidOnError)
                    .on(VKID.OAuthListInternalEvents.LOGIN_SUCCESS, function (payload) {
                        const code = payload.code; // Получаем code
                        const deviceId = payload.device_id;

                        VKID.Auth.exchangeCode(code, deviceId)
                            .then(onSuccessHandler)
                            .catch(onErrorHandler);
                    });

                function vkidOnSuccess(data) {
                    // Обработка полученного результата
                    console.log('Успешная авторизация:', data);
                }

                function vkidOnError(error) {
                    // Обработка ошибки
                    console.error('Ошибка авторизации:', error);
                }
            }
        };

        return () => {
            // Очистка при размонтировании компонента (удаление скрипта)
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            {/* Контейнер для кнопки ВКонтакте */}
            <div id="vk-login-container" />
        </div>
    );
};