import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; // Заменили useNavigate на useHistory

const Callback = () => {
    const history = useHistory(); // Используем useHistory

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get("code");

        if (code) {
            // Отправляем код на бэкенд
            axios.post("https://maksimshipilov.ru/api/vk/callback", { code })
                .then(() => {
                    history.push("/success"); // Переход на страницу успеха
                })
                .catch(() => {
                    history.push("/error"); // Переход на страницу ошибки
                });
        } else {
            history.push("/error");
        }
    }, [history]);

    return <h2>Обработка авторизации...</h2>;
};

export default Callback;