import express, {json, urlencoded} from "express";
import { genresRouter} from "../routes/genres.js";
import { customersRouter } from "../routes/customers.js";
import { moviesRouter } from "../routes/movies.js";
import { rentalsRouter } from "../routes/rentals.js";
import { usersRouter } from "../routes/users.js";
import { authRouter } from "../routes/auth.js";
import error from "../middleware/error.js";

export default function routesBase(app){
    app.use(json()); // For JSON payloads
    app.use(urlencoded({ extended: true })); // key=value$key=value
    app.use(express.static("public"))
    app.use("/api/genres", genresRouter);
    app.use("/api/customers", customersRouter);
    app.use("/api/movies", moviesRouter);
    app.use("/api/rentals", rentalsRouter);
    app.use("/api/users", usersRouter);
    app.use("/api/auth", authRouter);
    app.use(error);
    
}

