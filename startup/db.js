import mongoose from "mongoose";
import winston from "winston";
import config from "config";

const connectDb = () => {
  const db = process.env.db || config.get("db"); // prefer environment variable

  mongoose
    .connect(db)
    .then(() => winston.info("Connected to MongoDB..."))
    .catch((err) => winston.error("Could not connect to MongoDB...", err));
};

export default connectDb;
