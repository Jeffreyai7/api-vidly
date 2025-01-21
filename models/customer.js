import mongoose from "mongoose"
import { z } from "zod";

export const customerZodSchema = z.object({ 
    name: z.string().min(1, "The course has to be required"),
    isGold: z.boolean().default(false),
    phone: z.string().min(1, "The course has to be required")
})

export const customersSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 50 },
    isGold: { type: Boolean, default: false },
    phone: { type: String, required: true, minlength: 5, maxlength: 50 }
 })

 export const Customer = mongoose.model("Customers", customersSchema)
 