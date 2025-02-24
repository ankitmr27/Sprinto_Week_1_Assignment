import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    description: String
    publishedDate: String
    author: Author!
    reviews: [Review]
    createdAt: String
    updatedAt: String
  }

  type Author {
    id: ID!
    name: String!
    biography: String
    bornDate: String
    books: [Book]
    createdAt: String
    updatedAt: String
  }

  type Review {
    id: ID!
    rating: Int!
    comment: String
    book: Book!
    createdAt: String
    updatedAt: String
  }

  type Query {
    books(title: String, authorId: ID): [Book]
    authors(name: String): [Author]
    reviews(bookId: ID!): [Review]
  }

  type Mutation {
    createBook(
      title: String!
      description: String
      publishedDate: String
      authorId: ID!
    ): Book

    updateBook(
      id: ID!
      title: String
      description: String
      publishedDate: String
      authorId: ID
    ): Book

    deleteBook(id: ID!): String

    createAuthor(name: String!, biography: String, bornDate: String): Author

    updateAuthor(
      id: ID!
      name: String
      biography: String
      bornDate: String
    ): Author

    deleteAuthor(id: ID!): String
    createReview(bookId: ID!, rating: Int!, comment: String): Review
    deleteReview(id: ID!): String
  }
`;

export default typeDefs;
