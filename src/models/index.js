import { Book } from "./bookModel.js";
import { Author } from "./authorModel.js";
import { sequelize } from "../database/db.js";
import logger from "../utils/Logger.util.js";

// Define relationships
Author.hasMany(Book, { foreignKey: "authorId", onDelete: "CASCADE" });
Book.belongsTo(Author, { foreignKey: "authorId" });

await sequelize.sync({ alter: true }); // Ensure DB structure updates

logger.info("✅ Database models synced");
