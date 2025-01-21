import { z } from "zod";
import mongoose from "mongoose";
import { genreSchema } from "./genre.js";

export const movieSchema = new mongoose.Schema({       
     title: { type: String, required: true, minlength: 5, maxlength: 50 },
     genre: { type: genreSchema, required: true},
     numberInStock: { type: Number, required: true, min: 0, max: 255},
     dailyRentalRate: { type: Number, required: true, min:0, max:255}
 })
 

 export const movieZodSchema = z.object({
     title: z.string().min(1, "The title is required"),
     genreId: z.string(),
     numberInStock: z.number(),
     dailyRentalRate: z.number()
 })

 export const Movie = mongoose.model("Movies", movieSchema)    
 