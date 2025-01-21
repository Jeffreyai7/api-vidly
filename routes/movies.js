import express from "express";
import { Movie, movieZodSchema } from "../models/movie.js";
export const moviesRouter =  express.Router();

 


moviesRouter.get("/", async(req, res) => {
    const movies = await Movie.find();
    res.send(movies);

})


moviesRouter.post("/", async(req, res) =>{
    const validation = movieZodSchema.safeParse(req.body)
    if(!validation.success)
        return res.status(400).json({errors: validation.error.errors})

    const genre = await Genre.findById(req.body.genreId)
    if(!genre) return res.status(400).send("Invalid genre")

        let movie = new Movie({
        title : req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate        
    })

   movie = await movie.save();
    res.send(movie);
})



moviesRouter.get("/:id", async(req, res) => {
    
  const movie = await Movie.findById(req.params.id)
  if (!movie)
    return res.status(404).send("The movie with the given Id does not exist");
res.send(movie);
})




moviesRouter.put("/:id", async(req, res) =>{
    const validation = movieZodSchema.safeParse(req.body)
    if(!validation.success)
        return res.status(400).json({errors: validation.error.errors})
    const movie = await Movie.findByIdAndUpdate(req.params.id, {title, numberInStock, dailyRentalRate}, {
        new: true
    });
    if(!movie)
        return res.status(404).send("The genre with the given Id does not exist");

    res.send(movie);


})

moviesRouter.delete("/:id", async(req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id)
    if(!movie)
        return res.status(404).send("The genre with the given Id does not exist");  
    
    res.send(movie);
})
