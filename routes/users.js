import express from "express";
import { User, userZodSchema } from "../models/user.js";
export const usersRouter = express.Router();


usersRouter.post("/", async(req, res) =>{
    const validation = userZodSchema.safeParse(req.body)
    if(!validation.success)
        return res.status(400).json({errors: validation.error.errors})
    
    let user = await User.findOne({email: req.body.email});
    
    if(user) return res.status(400).send("User already registered");
    
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

   user = await user.save();
    res.send(user);
})

