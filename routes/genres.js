import express from "express";
export const genresRouter = express.Router()
import { genreZodSchema, Genre } from "../models/genre.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

genresRouter.get("/", async(req, res) => {
        const genres = await Genre.find().sort("name");
        res.send(genres);

})


genresRouter.post("/", auth,  async(req, res) =>{
    const validation = genreZodSchema.safeParse(req.body)
    if(!validation.success)
        return res.status(400).json({errors: validation.error.errors})
    let genre = new Genre({
        name: req.body.name
    })

   genre = await genre.save();
    res.send(genre);


})



genresRouter.get("/:id", auth, async(req, res) => {
    
  const genre = await Genre.findById(req.params.id)
  if (!genre)
    return res.status(404).send("The genre with the given Id does not exist");
res.send(genre);
})




genresRouter.put("/:id", auth,  async(req, res) =>{
    const validation = genreZodSchema.safeParse(req.body)
    if(!validation.success)
        return res.status(400).json({errors: validation.error.errors})
    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
        new: true
    });
    if(!genre)
        return res.status(404).send("The genre with the given Id does not exist");

    res.send(genre);


})

genresRouter.delete("/:id", [auth, admin], async(req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id)
    if(!genre)
        return res.status(404).send("The genre with the given Id does not exist");  
    
    res.send(genre);
})



