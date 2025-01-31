import mongoose from 'mongoose';
import winston from 'winston';


export default function connectDb(){
    mongoose.connect('mongodb://localhost/vidlyapp')
    .then(() => winston.info("Connected to MongoDB..."))

}


