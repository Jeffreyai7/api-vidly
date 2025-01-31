import "express-async-errors";
import express from "express";
import winston from "winston";
import "winston-mongodb";
import config from "config";
const app = express();
import routesBase from  "./startup/routes.js";
import connectDb from "./startup/db.js";
// import logging from "./startup/logging.js";

routesBase(app)
connectDb()

winston.handleExceptions(new winston.transports.File({filename: "uncaughtExceptions.log"})) 

process.on('unhandledRejection', (ex) => {
    throw ex
})

winston.add(new winston.transports.File({filename: "logfile.log"}))
// winston.add(new winston.transports.MongoDB, {
//     db: "mongodb://localhost/vidlyapp",
//     level: "info"
// })    


if(!config.get("jwtPrivateKey")){
    console.error("FATAL ERROR: jwtPrivateKey is not defined")
    process.exit(1)
}

app.get("/", (req, res) => {
    res.send("Hello World")
    })
    
    
    
const port = process.env.PORT || 5000

app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
    

