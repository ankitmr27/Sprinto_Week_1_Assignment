import typeDefs from "./schemas/typeDef.js";
import resolvers from "./resolver/resolver.js";
import { ApolloServer } from "apollo-server-express";

// GraphQL Server Setup
export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    const { Book } = await import("../models/bookModel.js"); // SQL
    const { Author } = await import("../models/authorModel.js"); // SQL
    const Review = (await import("../models/mongo/index.js")).default; // MongoDB

    return { Book, Author, Review };
  },
});

await server.start();
