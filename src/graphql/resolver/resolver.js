import { Op } from "sequelize";
import { Book } from "../../models/bookModel.js";
import { Author } from "../../models/authorModel.js";
import Review from "../../models/mongo/index.js";
import logger from "../../utils/Logger.util.js";

const resolvers = {
  Query: {
    books: async (_, { title, authorId }) => {
      try {
        const filter = {};
        if (title) filter.title = { [Op.iLike]: `%${title}%` };
        if (authorId) filter.authorId = authorId;
        return await Book.findAll({
          where: filter,
          include: [{ model: Author }], // Ensure correct relation mapping
        });
      } catch (error) {
        logger.error("Error fetching books:", error);
        throw new Error("Failed to fetch books");
      }
    },

    authors: async (_, { name }) => {
      try {
        const filter = name ? { name: { [Op.iLike]: `%${name}%` } } : {};
        return await Author.findAll({
          where: filter,
          include: [{ model: Book }], // Ensure correct relation mapping
        });
      } catch (error) {
        logger.error("Error fetching authors:", error);
        throw new Error("Failed to fetch authors");
      }
    },
    reviews: async (_, { bookId }) => {
      try {
        return await Review.find({ bookId });
      } catch (error) {
        logger.error("Error fetching reviews:", error);
        throw new Error("Failed to fetch reviews");
      }
    },
  },

  Mutation: {
    createBook: async (_, { title, description, publishedDate, authorId }) => {
      try {
        return await Book.create({
          title,
          description,
          publishedDate,
          authorId,
        });
      } catch (error) {
        logger.error("Error creating book:", error);
        throw new Error("Failed to create book");
      }
    },

    updateBook: async (_, { id, ...updates }) => {
      try {
        const book = await Book.findByPk(id);
        if (!book) throw new Error("Book not found");

        await book.update(updates);
        return book;
      } catch (error) {
        logger.error("Error updating book:", error);
        throw new Error("Failed to update book");
      }
    },

    deleteBook: async (_, { id }) => {
      try {
        const deleted = await Book.destroy({ where: { id } });
        if (!deleted) throw new Error("Book not found");
        return "Book deleted successfully";
      } catch (error) {
        logger.error("Error deleting book:", error);
        throw new Error("Failed to delete book");
      }
    },

    createAuthor: async (_, { name, biography, bornDate }) => {
      try {
        return await Author.create({ name, biography, bornDate });
      } catch (error) {
        logger.error("Error creating author:", error);
        throw new Error("Failed to create author");
      }
    },

    updateAuthor: async (_, { id, ...updates }) => {
      try {
        const author = await Author.findByPk(id);
        if (!author) throw new Error("Author not found");

        await author.update(updates);
        return author;
      } catch (error) {
        logger.error("Error updating author:", error);
        throw new Error("Failed to update author");
      }
    },

    deleteAuthor: async (_, { id }) => {
      try {
        const deleted = await Author.destroy({ where: { id } });
        if (!deleted) throw new Error("Author not found");
        return "Author deleted successfully";
      } catch (error) {
        logger.error("Error deleting author:", error);
        throw new Error("Failed to delete author");
      }
    },
    createReview: async (_, { bookId, user, rating, comment }) => {
      try {
        const newReview = new Review({ bookId, user, rating, comment });
        await newReview.save();
        return newReview;
      } catch (error) {
        logger.error("Error creating review:", error);
        throw new Error("Failed to create review");
      }
    },

    deleteReview: async (_, { id }) => {
      try {
        const deleted = await Review.findByIdAndDelete(id);
        if (!deleted) throw new Error("Review not found");
        return "Review deleted successfully";
      } catch (error) {
        logger.error("Error deleting review:", error);
        throw new Error("Failed to delete review");
      }
    },
  },

  Book: {
    author: async (book) => {
      try {
        return await Author.findByPk(book.authorId);
      } catch (error) {
        logger.error("Error fetching author:", error);
        throw new Error("Failed to fetch author");
      }
    },
    reviews: async (book) => await Review.find({ bookId: book.id }),
  },

  Author: {
    books: async (author) => {
      try {
        return await Book.findAll({ where: { authorId: author.id } });
      } catch (error) {
        logger.error("Error fetching books:", error);
        throw new Error("Failed to fetch books");
      }
    },
  },
};

export default resolvers;
