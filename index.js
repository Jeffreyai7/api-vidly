import "express-async-errors";
import express from "express";
const app = express();
import routesBase from  "./startup/routes.js";
import connectDb from "./startup/db.js";
import logging from "./startup/logging.js";
import configure from "./startup/config.js";


routesBase(app)
connectDb()
logging()
configure()




app.get("/", (req, res) => {
    res.send("Hello World")
    })
    
    
    
const port = process.env.PORT || 5000

app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
    

