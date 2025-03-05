import supertest from "supertest";
import server from "../..";
import { Rental } from "../../models/rental";
import mongoose from "mongoose";
import { User } from "../../models/user";

describe("/api/returns", () => {
  let customerId;
  let movieId;
  let rental;
  beforeEach(async () => {
    customerId = new mongoose.Types.ObjectId();
    movieId = new mongoose.Types.ObjectId();
    rental = new Rental({
      customer: {
        _id: customerId,
        name: "12345",
        phone: "12345",
      },
      movie: {
        _id: movieId,
        title: "12345",
        dailyRentalRate: 2,
      },
    });
    await rental.save();
  });

  afterEach(async () => {
    await new Promise((resolve) => server.close(resolve));
    await Rental.deleteMany({});
  });

  it("should work", async () => {
    const result = await Rental.findById(rental._id);
    expect(result).not.toBeNull();
  });

  it("should return 401 if client is not logged in", async () => {
    const res = await supertest(server)
      .post("/api/returns")
      .send({ customerId, movieId });
    expect(res.status).toBe(401);
  });

  it("should return 400 if custmerId is not provided", async () => {
    const token = new User().generateAuthToken();

    const res = await supertest(server)
      .post("/api/returns")
      .set("x-auth-token", token)
      .send({ movieId });

    expect(res.status).toBe(400);
  });

  it("should return 400 if movieId is not provided", async () => {
    const token = new User().generateAuthToken();

    const res = await supertest(server)
      .post("/api/returns")
      .set("x-auth-token", token)
      .send({ customerId });

    expect(res.status).toBe(400);
  });
});
