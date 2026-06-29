import { sendMessageToTelegram } from "./bot.js";
import corn from "node-cron";

const sendMessageTask = async () => {
  try {
    await sendMessageToTelegram();
  } catch (err) {
    console.log("Error executing sendMessageTask:", err);
  }
};

// Schediling a task to run every 1 minute for testing purposes. In production, it should be set to run every 4 hours.
const task = corn.schedule("* */4 * * *", sendMessageTask, {
  scheduled: true,
  timezone: "Asia/Kolkata",
});

task.on("execution:finished", () => {
  console.log("Task executed at: " + new Date().toLocaleString());
});

task.on("execution:failed", (err) => {
  console.log("Task execution failed at: " + new Date().toLocaleString());
  console.error(err);
  process.exit(1); // Exit the process with an error code
});
