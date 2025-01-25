import express from "express";
import { User, userZodSchema } from "../models/user.js";
export const usersRouter = express.Router();
import _ from "lodash";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";
import auth from "../middleware/auth.js";



usersRouter.get("/me", auth, async(req, res) => {  
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
 }) 

usersRouter.post("/", async(req, res) =>{
    const validation = userZodSchema.safeParse(req.body)
    if(!validation.success)
        return res.status(400).json({errors: validation.error.errors})
    
    let user = await User.findOne({email: req.body.email});
    
    if(user) return res.status(400).send("User already registered");
    const salt =  await bcrypt.genSalt(10);
    
    user = new User(_.pick(req.body, ["name", "email", "password"]))

    user.password = await bcrypt.hash(user.password, salt);

   user = await user.save();
    const token = user.generateAuthToken();
    
    res.header("x-auth-token", token).send(_.pick(user, ["_id", "name", "email"]))
})


