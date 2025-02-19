import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

import { Author } from "./authorModel.js";

export const Book = sequelize.define("Book", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  publishedDate: { type: DataTypes.DATEONLY },
  authorId: { type: DataTypes.UUID, references: { model: Author, key: "id" } },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE },
});
