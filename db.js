import { Sequelize } from "sequelize";

export default new Sequelize("telegram_bot", "root", "root", {
  host: "localhost",
  dialect: "postgres",
});
