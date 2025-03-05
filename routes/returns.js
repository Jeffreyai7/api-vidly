import express from "express";
export const returnsRouter = express.Router();

returnsRouter.post("/", async (req, res) => {
  if (!req.header("x-auth-token")) return res.status(401).send("Unauthorized");
  if (!req.body.customerId)
    return res.status(400).send("customerId not provided");

  if (!req.body.movieId) return res.status(400).send("movieId not provided");
});
