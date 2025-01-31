import winston from "winston"
import "winston-mongodb";
import "express-async-errors";


export default function logging() {

    winston.handleExceptions(
        new winston.transports.Console({colorize: true, prettyPrint: true}),
        new winston.transports.File({filename: "uncaughtExceptions.log"})) 
    

    process.on('unhandledRejection', (ex) => {
        throw ex
    })
    
    winston.add(new winston.transports.File({filename: "logfile.log"}))
    
    winston.add(new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        ),
      }));

    winston.add(new winston.transports.MongoDB({
        db: "mongodb://localhost/vidlyapp",
        level: "info",
    }))    
    
}