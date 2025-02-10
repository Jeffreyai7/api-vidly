import mongoose from "mongoose";
import { z } from "zod";
import jwt from "jsonwebtoken";
import config from "config";
// import admin from "../middleware/admin";

export const userZodSchema = z.object({
  name: z.string().min(3, "Name Should be more than 3 characters"),
  email: z
    .string()
    .email({ message: "Please provide a valid email" })
    .min(3, "Email Should be more than 3 characters"),
  password: z.string().min(7, "Password Should be more than 3 characters"),
});

export const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  admin: { type: Boolean },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, admin: this.admin },
    config.get("jwtPrivateKey")
  );
  return token;
};

export const User = mongoose.model("Users", userSchema);
