const { Telegraf } = require("telegraf");
const schedule = require("node-schedule");

// Replace 'YOUR_BOT_TOKEN' with your actual token
const bot = new Telegraf('YOUR_BOT_TOKEN');

// Store user notifications
const userNotifications = {};

// Command to start setting up notifications
bot.command("start", (ctx) => {
  ctx.reply(
      "📅 Set up your notification. Send me a message with the format: " +
      "/setnotification HH:MM Your notification message"
  );
});

// Middleware to handle notification setup
bot.command("setnotification", (ctx) => {
  const message = ctx.message.text;

  // Extract the time and message using a regular expression
  const match = message.match(/^\/setnotification\s+([\d:]+)\s+(.+)/);

  // Check if the time and message are provided
  if (match) {
    const time = match[1];
    const notificationMessage = match[2];

    // Save the notification for the user
    const userId = ctx.message.from.id;

    // Check if the user already has notifications
    if (!userNotifications[userId]) {
      userNotifications[userId] = [];
    }

    // Add the new notification to the array
    userNotifications[userId].push({ time, message: notificationMessage });

    ctx.reply(`✅ Notification set for ${time} - ${notificationMessage}`);

    // Schedule the notification
    scheduleNotification(userId, time, notificationMessage);
  } else {
    ctx.reply(
        "⚠️ Please provide both time and notification message in the correct format. " +
        "\n\nExample format: `/setnotification 12:30 Cook some dinner`"
    );
  }
});

// Command to view all notifications
bot.command("viewnotifications", (ctx) => {
  const userId = ctx.message.from.id;
  const userNotificationsArray = userNotifications[userId];

  if (userNotificationsArray && userNotificationsArray.length > 0) {
    // Use map to create a string for each notification
    const notificationsString = userNotificationsArray
        .map((notification, index) => {
          return `${index + 1}. ${notification.time} - ${notification.message}`;
        })
        .join("\n");

    ctx.reply(
        `Your notifications:\n${notificationsString}\n\nTo delete a notification, use /deletenotification <index>`
    );
  } else {
    ctx.reply("You have no notifications set.");
  }
});

// Command to delete a notification by index
bot.command("deletenotification", (ctx) => {
  const userId = ctx.message.from.id;
  const indexToDelete = parseInt(ctx.message.text.split(" ")[1]); // Extract index from command

  if (!isNaN(indexToDelete)) {
    // Attempt to delete the notification
    const deleted = deleteNotification(userId, indexToDelete - 1);
    // Adjust index since users usually start counting from 1

    if (deleted) {
      ctx.reply("✅ Notification deleted successfully.");
    } else {
      ctx.reply("⚠️ Unable to delete notification. Please check the index.");
    }
  } else {
    ctx.reply("⚠️ Please provide a valid index to delete a notification.");
  }
});

// Command to show help and disable other commands
bot.command("help", (ctx) => {
  ctx.reply(
      "🤖 Notification Bot\n\n📅 To set up a notification: /setnotification HH:MM Your notification message" +
      "\n\n📆 To view all notifications: /viewnotifications\n\n🗑 To delete a notification: " +
      "/deletenotification <index>\n\n❓ For help: /help"
  );
});

// Function to schedule a notification
function scheduleNotification(userId, time, message) {
  const [hours, minutes] = time.split(":");

  // Schedule the job
  userNotifications[userId].job = schedule.scheduleJob(
      { hour: parseInt(hours), minute: parseInt(minutes) },
      () => {
        // Send the notification to the user
        bot.telegram.sendMessage(userId, `⏰ Reminder: ${message}`);
      }
  );
}

// Function to delete a specific notification for a user
function deleteNotification(userId, index) {
  const userNotificationsArray = userNotifications[userId];

  if (userNotificationsArray && userNotificationsArray.length > index) {
    // Remove the notification at the specified index
    userNotificationsArray.splice(index, 1);
    return true; // Return true if deletion is successful
  }
  return false; // Return false if deletion fails (e.g., index out of bounds)
}

// Start the bot
bot.launch();