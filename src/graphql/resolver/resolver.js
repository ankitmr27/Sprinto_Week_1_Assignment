import { Book } from "../../models/bookModel.js";
import { Author } from "../../models/authorModel.js";

const resolvers = {
  Query: {
    books: async (_, { title, authorId }) => {
      const filter = {};
      if (title) filter.title = { [Op.iLike]: `%${title}%` };
      if (authorId) filter.authorId = authorId;
      return await Book.findAll({ where: filter, include: Author });
    },
    authors: async (_, { name }) => {
      const filter = name ? { name: { [Op.iLike]: `%${name}%` } } : {};
      return await Author.findAll({ where: filter, include: Book });
    },
  },

  Mutation: {
    createBook: async (_, { title, description, publishedDate, authorId }) => {
      return await Book.create({ title, description, publishedDate, authorId });
    },
    updateBook: async (_, { id, ...updates }) => {
      await Book.update(updates, { where: { id } });
      return await Book.findByPk(id);
    },
    deleteBook: async (_, { id }) => {
      await Book.destroy({ where: { id } });
      return "Book deleted successfully";
    },

    createAuthor: async (_, { name, biography, bornDate }) => {
      return await Author.create({ name, biography, bornDate });
    },
    updateAuthor: async (_, { id, ...updates }) => {
      await Author.update(updates, { where: { id } });
      return await Author.findByPk(id);
    },
    deleteAuthor: async (_, { id }) => {
      await Author.destroy({ where: { id } });
      return "Author deleted successfully";
    },
  },
};

export default resolvers;
