import { Book } from "./bookModel";
import { Author } from "./authorModel";
import { sequelize } from "../database/db.js";

Author.hasMany(Book, { foreignKey: "authorId" });
Book.belongsTo(Author, { foreignKey: "authorId" });

sequelize.sync();
