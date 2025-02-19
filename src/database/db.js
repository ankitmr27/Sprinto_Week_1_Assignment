import { Sequelize } from "sequelize";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// PostgreSQL Connection
export const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: "postgres",
  logging: false,
});

// MongoDB Connection
export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};
