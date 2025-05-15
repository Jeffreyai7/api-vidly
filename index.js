import "express-async-errors";
import express from "express";
const app = express();
import routesBase from "./startup/routes.js";
import connectDb from "./startup/db.js";
import logging from "./startup/logging.js";
import configure from "./startup/config.js";
import winston from "winston";
import prod from "./startup/prod.js";
// import dotenv from "dotenv";
// dotenv.config();

routesBase(app);
connectDb();
logging();
configure();
prod(app);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  winston.info(`listening on port ${port}`);
});

export default server;
