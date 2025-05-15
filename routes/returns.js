import express from "express";
import moment from "moment";
import { Rental } from "../models/rental.js";
import { Movie } from "../models/movie.js";
export const returnsRouter = express.Router();

returnsRouter.post("/", async (req, res) => {
  // First, check for authentication
  if (!req.header("x-auth-token")) return res.status(401).send("Unauthorized");

  // Validate required fields
  if (!req.body.customerId)
    return res.status(400).send("customerId not provided");
  if (!req.body.movieId) return res.status(400).send("movieId not provided");

  // Find rental
  const rental = await Rental.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId,
  });

  if (!rental) return res.status(404).send("Rental not found");

  if (rental.dateReturned)
    return res.status(400).send("rental already processed");

  rental.dateReturned = new Date();

  const rentalDays = moment().diff(rental.dateOut, "days");

  rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
  await rental.save();

  await Movie.updateMany(
    { _id: rental.movie._id },
    {
      $inc: { numberInStock: 1 },
    }
  );

  res.status(200).send(rental); // Return rental for now
});
