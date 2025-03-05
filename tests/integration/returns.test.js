import supertest from "supertest";
import server from "../..";
import { Rental } from "../../models/rental";
import mongoose from "mongoose";
import { User } from "../../models/user";

describe("/api/returns", () => {
  let token;
  let customerId;
  let movieId;
  let rental;

  const exec = () => {
    return supertest(server)
      .post("/api/returns")
      .set("x-auth-token", token)
      .send({ customerId, movieId });
  };

  beforeEach(async () => {
    token = new User().generateAuthToken();
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
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 if custmerId is not provided", async () => {
    customerId = "";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 400 if movieId is not provided", async () => {
    movieId = "";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 404 if no rental found for the customer/movie", async () => {
    customerId = new mongoose.Types.ObjectId(); // New, unknown customerId
    movieId = new mongoose.Types.ObjectId(); // New, unknown movieId
    const res = await exec();
    expect(res.status).toBe(404);
  });
});
