// const express = require('express');
// const session = require('express-session');
// const passport = require('passport');
// const YandexStrategy = require('passport-yandex').Strategy;
//
// const app = express();
//
// // Сессии для сохранения состояния пользователя
// app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
// app.use(passport.initialize());
// app.use(passport.session());
//
// // Настройка стратегии Яндекс OAuth
// passport.use(
//     new YandexStrategy(
//         {
//             clientID: 'ca5368ddb6f04bdfa7d688aee3bf6967',
//             clientSecret: '26c4e4762ac646e0891694e1c5c21e89',
//             callbackURL: 'https://5436-46-8-70-209.ngrok-free.app/auth/yandex/callback', // Замените на ваш реальный URL
//         },
//         (accessToken, refreshToken, profile, done) => {
//             return done(null, profile);
//         }
//     )
// );
//
// // Сохранение и восстановление пользователя из сессии
// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((obj, done) => done(null, obj));
//
// // Роуты для авторизации
// app.get('/auth/yandex', passport.authenticate('yandex'));
//
// app.get(
//     '/auth/yandex/callback',
//     passport.authenticate('yandex', { failureRedirect: '/' }),
//     (req, res) => {
//         res.redirect('/'); // Успешный редирект
//     }
// );
//
// app.get('/logout', (req, res) => {
//     req.logout(() => {
//         res.redirect('/');
//     });
// });
//
// // Запуск сервера
// app.listen(5001, () => console.log('Server started on http://localhost:5001'));