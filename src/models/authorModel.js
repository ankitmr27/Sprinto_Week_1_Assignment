import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Author = sequelize.define("Author", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  biography: { type: DataTypes.TEXT },
  bornDate: { type: DataTypes.DATEONLY },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE },
});
