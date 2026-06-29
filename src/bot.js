import path from "path";
import TelegramBot from "node-telegram-bot-api";
import { fileURLToPath } from "url";
import axios from "axios";
import { text } from "stream/consumers";
import dotenv from "dotenv";
import corn from "node-cron";
import { fetchLatestNews } from "./newsFetcher.js";

// Recreate __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config .env file path
dotenv.config({ path: path.join(__dirname, "../.env") });

// Telegram configuration
const token = process.env.TELEGRAM_BOT_KEY;
const channelId = process.env.TELEGRAM_CHANNEL_ID;

const bot = new TelegramBot(token, { polling: false });

// This is to design a message structure. and returns the structure
function designMessage(title, description, reference) {
  return `
		<b>${title}</b>\n
		<em>${description}</em>\n
		<a href=\"${reference}\">Click here to read</a>
	`;
}

// Sending message to the telegram channel.
export async function sendMessageToTelegram(message) {
  try {
    const data = await fetchLatestNews();
    // console.log(data.results);
    data?.results.forEach(async (item) => {
      const telegram_response = await bot.sendMessage(
        channelId,
        designMessage(
          item.title,
          item.description || "No Description Provided",
          item.link,
        ),
        { parse_mode: "HTML" },
      );
    });
  } catch (err) {
    console.log("Error sending message to Telegram channel:", err);
  }
}