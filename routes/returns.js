import express from "express";
export const returnsRouter = express.Router();

returnsRouter.post("/", async (req, res) => {
  if (!req.body.customerId || !req.body.movieId)
    return res.status(400).send("customerId not provided");
  res.status(401).send("Unauthorized");
});
