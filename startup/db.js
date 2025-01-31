import winston from 'winston';
import mongoose from "mongoose";


export default function(app){
    mongoose.connect('mongodb://localhost/vidlyapp')
    .then(() => winston.info("Connected to MongoDB..."))

}