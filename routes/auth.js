import express from "express";
import { User, userZodSchema } from "../models/user.js";
export const authRouter = express.Router();
import _ from "lodash";
import bcrypt from "bcrypt";
import { z } from "zod";



const authZodSchema = z.object({
    email: z.string().email({message: "Please provide a valid email"}).min(3, "Email Should be more than 3 characters"),
    password: z.string().min(7, "Password Should be more than 3 characters")
})


authRouter.post("/", async(req, res) =>{
    const validation = authZodSchema.safeParse(req.body)
    if(!validation.success)
        return res.status(400).json({errors: validation.error.errors})
    
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Invalid email or Password");
    
   const validPassword = await bcrypt.compare(req.body.password, user.password);
   if(!validPassword)
    return res.status(400).send("Invalid email or Password");

    const token = user.generateAuthToken();
    res.send(token);
})




