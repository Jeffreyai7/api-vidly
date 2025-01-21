import { z } from "zod";
import mongoose from "mongoose";

export const rentalZodSchema = z.object({
    customerId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "Invalid ObjectId",
      }),
    movieId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "Invalid ObjectId",
      })
})

export const rentalSchema = new mongoose.Schema({  
    customer :{type: new mongoose.Schema({
        name: {type: String, required: true, minlength: 5, maxlength: 50},
        isGold:{type: Boolean, default: false},
        phone: {type: String, required:true},
    }), required : true},
    movie: {
        type: new mongoose.Schema({
            title:{type: String, required: true, trim:true, minlength:5, maxlength:255},
            dailyRentalRate: { type: Number, required: true, min: 0, max: 255},
        }),
        required: true
    },
    dateOut: {type: Date, required: true, default: Date.now},
    dateReturned: {type: Date, },
    rentalFee: {type: Number, min: 0}
})

export const Rental = mongoose.model("Rental", rentalSchema)    
