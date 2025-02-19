import express from "express";
import { sequelize, connectMongo } from "./src/database/db.js";
import { server } from "./src/graphql/index.js";
// configure dotenv
import * as config from "dotenv";
config.config();

const app = express();

// Express Middleware
app.use(express.json());

server.applyMiddleware({ app });

app.get("/health", (req, res) => {
  res.send("Server is up and running");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, async () => {
  try {
    await sequelize.authenticate();
    await connectMongo();
    console.log("PostgreSQL and Mongodb connected");
  } catch (error) {
    console.error("Unable to connect to darabase:", error);
  }
  console.log(
    `Server running on http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
});
