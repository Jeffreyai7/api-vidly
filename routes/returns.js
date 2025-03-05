import express from "express";
import { Rental } from "../models/rental";

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

  // res.status(200).send(rental); // Return rental for now
});
