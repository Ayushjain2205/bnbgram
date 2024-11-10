import { Composer, InlineKeyboard } from "grammy";
import type { Context } from "./context.js";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

// Helper function to check if text matches bnbgram URL pattern
const isBnbgramUrl = (
  text: string
): { isValid: boolean; path: string | null } => {
  try {
    const regex = /https:\/\/bnbgram\/([^\s]+)/;
    const match = text.match(regex);

    if (match && match[1]) {
      return {
        isValid: true,
        path: match[1],
      };
    }

    return {
      isValid: false,
      path: null,
    };
  } catch {
    return {
      isValid: false,
      path: null,
    };
  }
};

feature.on("message:text", async (ctx) => {
  const messageText = ctx.message.text;
  const urlCheck = isBnbgramUrl(messageText);

  if (urlCheck.isValid && urlCheck.path) {
    // Create Web App URL directly to the tile
    const webAppUrl = `${process.env.FRONTEND_APP_ORIGIN}/blip/${urlCheck.path}`;

    // Create inline keyboard with Web App button
    const keyboard = new InlineKeyboard().webApp("Launch Blip", webAppUrl);

    return ctx.reply("View this Blip:", { reply_markup: keyboard });
  }

  // If not a bnbgram URL, just echo the message back
  return ctx.reply(messageText);
});

export { composer as messagesFeature };
