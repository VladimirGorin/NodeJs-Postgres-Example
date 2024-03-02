import sequelize from "./db.js";
import { DataTypes } from "sequelize";

export const UserModel = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey:true, unique:true, autoIncrement:true},
    chatId: {type: DataTypes.STRING, unique: true},
    right: {type: DataTypes.INTEGER, defaultValue: 0},
    wrong: {type: DataTypes.INTEGER, defaultValue: 0}
})
