import express, { json, urlencoded } from "express";
import { genresRouter} from "./routes/genres.js";
import { customersRouter } from "./routes/customers.js";
import { moviesRouter } from "./routes/movies.js";
import { rentalsRouter } from "./routes/rentals.js";
import { usersRouter } from "./routes/users.js";
import { authRouter } from "./routes/auth.js";
import mongoose from "mongoose";
import config from "config";
const app = express();


if(!config.get("jwtPrivateKey")){
    console.error("FATAL ERROR: jwtPrivateKey is not defined")
    process.exit(1)
}
mongoose.connect('mongodb://localhost/vidlyapp')
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to MongoDB", err))

// middleware function
app.use(json()); // For JSON payloads
app.use(urlencoded({ extended: true })); // key=value$key=value
app.use(express.static("public"))


  app.use("/api/genres", genresRouter);
  app.use("/api/customers", customersRouter);
  app.use("/api/movies", moviesRouter);
  app.use("/api/rentals", rentalsRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/auth", authRouter);
  

//configuration
// console.log('Application Name: ' + c.get('name'));
// console.log(`Mailserver: ${c.get("mailserver.host")}`)
// console.log(`Mail Password: ${c.get("mailserver.password")}`)



// if(app.get('env') === 'production'){
//     app.use(morgan("tiny")) //morgan helps you log http requests
    
// }

app.get("/", (req, res) => {
    res.send("Hello World")
    })
    
    const port = process.env.PORT || 5000

    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
    

