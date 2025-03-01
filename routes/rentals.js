import express from "express";
import { Rental, rentalZodSchema } from "../models/rental.js";
import { Customer } from "../models/customer.js";
import { Movie } from "../models/movie.js";
export const rentalsRouter = express.Router();

rentalsRouter.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

rentalsRouter.post("/", async (req, res) => {
  const validation = rentalZodSchema.safeParse(req.body);
  if (!validation.success)
    return res.status(400).json({ errors: validation.error.errors });

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  // try{
  //     new Fawn.Task()
  //         .save("rentals", rental)
  //         .update("movies", {_id: movie._id}, {
  //             $inc: {numberInStock: -1}
  //         })
  //         .run();

  //     res.send(rental);

  // }catch(ex){
  //     res.status(500).send("something failed")
  // }

  rental = await rental.save();
  movie.numberInStock--;
  movie.save();
  res.send(rental);
});

rentalsRouter.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental)
    return res.status(404).send("The movie with the given Id does not exist");
  res.send(rental);
});

rentalsRouter.put("/:id", async (req, res) => {
  const validation = rentalZodSchema.safeParse(req.body);
  if (!validation.success)
    return res.status(400).json({ errors: validation.error.errors });
  const rental = await Rental.findByIdAndUpdate(
    req.params.id,
    { customerId, movieId },
    {
      new: true,
    }
  );
  if (!rental)
    return res.status(404).send("The rental with the given Id does not exist");

  res.send(rental);
});

rentalsRouter.delete("/:id", async (req, res) => {
  const rental = await Rental.findByIdAndDelete(req.params.id);
  if (!rental)
    return res.status(404).send("The rental with the given Id does not exist");

  res.send(rental);
});
