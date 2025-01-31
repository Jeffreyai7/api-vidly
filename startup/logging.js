import winston from "winston"
import "winston-mongodb";
import "express-async-errors";


export default function logging() {

    winston.handleExceptions(new winston.transports.File({filename: "uncaughtExceptions.log"})) 
    
    process.on('unhandledRejection', (ex) => {
        throw ex
    })
    
    winston.add(new winston.transports.File({filename: "logfile.log"}))
    
    winston.add(new winston.transports.MongoDB({
        db: "mongodb://localhost/vidlyapp",
        level: "info",
    }))    
    
}