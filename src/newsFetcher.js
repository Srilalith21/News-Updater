import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import { text } from "stream/consumers";
import { config } from "dotenv";

// Recreate __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config .env file path
config(path.join(__dirname, "../.env"));

export async function fetchLatestNews() {
  const key = process.env.NEWS_DATA_KEY;
  const url = `https://newsdata.io/api/1/latest?apikey=${key}&country=in,fr,us&language=en&category=technology&timezone=asia/kolkata&removeduplicate=1`;
  try {
    const response = await axios.get(url);
    // console.log(response.data.status); -----DEBUGGING PURPOSES
    if (response.data.status != "success") return null;
    return response.data;
  } catch (err) {
    console.log("Error fetching news");
    return null;
  }
}
