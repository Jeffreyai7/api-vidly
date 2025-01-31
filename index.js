import "express-async-errors";
import winston from "winston";
import express, { json, urlencoded } from "express";
import config from "config";
const app = express();
import "./startup/routes.js";
import "./startup/db.js";

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
    

