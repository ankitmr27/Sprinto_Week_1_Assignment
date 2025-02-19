import { Book } from "../models/bookModel.js";
import { Author } from "../models/authorModel.js";
import typeDefs from "./schemas/typeDef.js";
import resolvers from "./resolver/resolver.js";
import { ApolloServer } from "apollo-server-express";

// GraphQL Server Setup
export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { Book, Author },
});

await server.start();
