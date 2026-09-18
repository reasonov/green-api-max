# MAX-чат на GREEN-API

Веб-чат для отправки и получения текстовых сообщений в мессенджере MAX через [GREEN-API](https://green-api.com/max).

## Локальный запуск

Нужны Node.js 20+ и npm.

```bash
npm install
npm run dev
```

Приложение откроется на `http://localhost:5173`.

Другие команды:

```bash
npm test
npm run lint
npm run build
npm run preview
```

## Учетные данные GREEN-API

1. Зарегистрируйтесь в [личном кабинете](https://console.green-api.com).
2. Создайте инстанс MAX и авторизуйте его по QR-коду.
3. Скопируйте `idInstance` и `apiTokenInstance`.
4. В настройках инстанса оставьте пустым `webhookUrl` и включите получение входящих сообщений. При входе приложение само вызывает `setSettings` с этими параметрами.

## Как проверить сценарий

1. Откройте приложение и введите `idInstance` и `apiTokenInstance`.
2. Создайте чат по номеру получателя (Россия `7…` или Беларусь `375…`).
3. Отправьте текстовое сообщение — оно уйдёт методом `SendMessage`.
4. Ответьте из приложения MAX на телефоне получателя.
5. Ответ появится в чате через long-polling `ReceiveNotification` / `DeleteNotification`.

История сообщений хранится только в текущей сессии браузера. Учетные данные сохраняются в `sessionStorage` до закрытия вкладки.

## Публикация на GitHub Pages

После пуша в `main` workflow `.github/workflows/deploy.yml` собирает проект и публикует `dist`.

В настройках репозитория: **Settings → Pages → Source → GitHub Actions**.

## Скриншоты

- [Логин](docs/login.png)
- [Чат](docs/chat.png)

## Стек

React, TypeScript, Vite. Запросы к API идут напрямую из браузера на `https://api.green-api.com/v3`.
