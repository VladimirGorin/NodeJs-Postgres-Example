import TelegramBot from "node-telegram-bot-api";
import sequelize from "./db.js";
import { UserModel } from "./models.js";

const token = "2131258324:AAGaFB07Zg7i6xhf-pBX3tvtpjV_oIed1EE";

const bot = new TelegramBot(token, { polling: true });

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    console.log("db connected");
  } catch (error) {
    return console.log("Have some error on db init");
  }

  try {
    bot.on("message", async (msg) => {
      const chatId = msg.from.id;
      const message = msg.text;

      const findUser = await UserModel.findOne({ chatId });

      if (!findUser) {
        await UserModel.create({ chatId });
      }

      const user = await UserModel.findOne({ chatId });

      if (message === "/start") {
        user.right += 1;
        await bot.sendMessage(chatId, "+1");
      } else if (message === "/info") {
        await bot.sendMessage(
          chatId,
          `wrong: ${user.wrong}\nright: ${user.right}`
        );
      } else {
        user.wrong += 1;
        await bot.sendMessage(chatId, "-1");
      }

      await user.save()
    });

    console.log("Bot started");
  } catch (error) {
    return console.log(`Have some on bot init error: ${error}`);
  }
}

start();
