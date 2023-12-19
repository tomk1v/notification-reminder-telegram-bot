# Notification Reminder Bot by tomk1v

A Telegram bot that allows users to set up and manage notifications.

## Setup

1. Install the required dependencies:

    ```
    npm install telegraf node-schedule
    ```

2. Replace `'YOUR_BOT_TOKEN'` with your actual Telegram bot token in the `BOT_TOKEN` variable.

3. Run the bot:

    ```
    node your_bot_script.js
    ```
    
## Usage

1. Start a chat with the bot on Telegram.

2. Use the commands to set, view, and delete notifications.

## Commands

- `/start`: Start setting up notifications.

- `/setnotification HH:MM Your notification message`: Set up a notification at the specified time.

- `/viewnotifications`: View all set notifications.

- `/deletenotification <index>`: Delete a notification by its index.

- `/help`: Show help and disable other commands.

![Screenshot from 2023-12-19 09-43-30](https://github.com/tomk1v/notification-reminder-telegram-bot/assets/91790934/46b79019-74f2-46bc-ab7c-3e8ea87dbe71)

## Features

- Set up notifications at specific times.
- View a list of all set notifications.
- Delete notifications as needed.

## Dependencies

- [Telegraf](https://telegraf.js.org/)
- [node-schedule](https://www.npmjs.com/package/node-schedule)

## Notes

- Notifications are scheduled using the `node-schedule` library.
- Notifications are sent as reminders via Telegram messages.

## Issues

If you encounter any issues or have suggestions, please [open an issue](https://github.com/tomk1v/notification-reminder-telegram-bot/issues).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
