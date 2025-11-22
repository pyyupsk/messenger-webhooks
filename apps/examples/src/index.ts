import type { MessageEvent } from "@pyyupsk/messenger-webhooks";

import { Bot } from "@pyyupsk/messenger-webhooks";
import "dotenv/config";

import { getWeather } from "./weatherService";

const bot = new Bot({
  accessToken: process.env.ACCESS_TOKEN ?? "",
  verifyToken: process.env.VERIFY_TOKEN ?? "",
});

bot.on("message", async (event: MessageEvent) => {
  const { sender, message } = event;

  if (message.is_echo) return;

  if (message.text) {
    const place = message.text.trim();
    try {
      const weatherInfo = await getWeather(place);
      await bot.sendTextMessage(sender.id, weatherInfo);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      await bot.sendTextMessage(
        sender.id,
        "Sorry, I couldn't find weather information for that city.",
      );
    }
  } else {
    await bot.sendTextMessage(
      sender.id,
      "Please send me a place to get the weather information.",
    );
  }
});

bot.on("echo", async (event: MessageEvent) => {
  console.log(event);
});

bot.start();
