import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    description: String!
    publishedDate: String!
    author: Author!
  }

  type Author {
    id: ID!
    name: String!
    biography: String!
    bornDate: String!
    books: [Book]
  }

  type Query {
    books(title: String, authorId: ID): [Book]
    authors(name: String): [Author]
  }

  type Mutation {
    createBook(
      title: String!
      description: String!
      publishedDate: String!
      authorId: ID!
    ): Book
    updateBook(
      id: ID!
      title: String
      description: String
      publishedDate: String
    ): Book
    deleteBook(id: ID!): String

    createAuthor(name: String!, biography: String!, bornDate: String!): Author
    updateAuthor(
      id: ID!
      name: String
      biography: String
      bornDate: String
    ): Author
    deleteAuthor(id: ID!): String
  }
`;

export default typeDefs;
