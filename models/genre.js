import { z } from "zod";
import mongoose from "mongoose";


export const genreSchema = new mongoose.Schema({       
    name: { type: String, required: true, minlength: 5, maxlength: 50 },
    
})

export const genreZodSchema = z.object({
    name: z.string().min(1, "The genre has to be required")
})

export const Genre = mongoose.model("Genres", genreSchema)    
