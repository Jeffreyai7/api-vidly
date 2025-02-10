import mongoose from 'mongoose';
import winston from 'winston';
import config from "config";


export default function connectDb(){
    const db = config.get('db')
    mongoose.connect(db)
    .then(() => winston.info(`Connected to ${db}...`))

}


