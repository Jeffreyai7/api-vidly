import supertest from "supertest";
import server from "../../index.js";
import { Genre } from "../../models/genre.js";
import { User } from "../../models/user.js";
import mongoose from "mongoose";

describe("/api/genres", () => {
  beforeEach(async () => {
    await Genre.deleteMany({}); // Clears genres collection before each test
  });

  afterEach(async () => {
    server.close();
    await Genre.deleteMany({});
  });

  describe("/GET", () => {
    it("should return all genres", async () => {
      await Genre.insertMany([{ name: "genre1" }, { name: "genre2" }]);
      const res = await supertest(server).get("/api/genres");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
    });
  });

  describe("GET/:id", () => {
    it("should return genre if valid id is passed", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();

      const res = await supertest(server).get("/api/genres/" + genre._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });

    it("should return 404 if invalid id is passed", async () => {
      const res = await supertest(server).get("/api/genres/1");

      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    // Define the happy path

    let token;
    let name;

    const exec = async () => {
      return await supertest(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = "genre1";
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if genre is less than 5 characters", async () => {
      name = "1234";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if genre is more than 5 characters", async () => {
      name = new Array(52).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should save the genre if it is valid", async () => {
      await exec();
      const genre = await Genre.find({ name: "genre1" });

      expect(genre).not.toBeNull();
    });
    it("should the genre if it is valid", async () => {
      const res = await exec();

      const genre = await Genre.find({ name: "genre1" });

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genre1");
    });
  });

  describe("Put /:id", () => {
    it("should return 401 if client is not logged in", async () => {
      const res = await supertest(server)
        .put("/api/genres/1")
        .send({ name: "genre1" });
      expect(res.status).toBe(401);
    });

    it("should return 400 if genre is less than 5 characters", async () => {
      const token = new User().generateAuthToken();
      const res = await supertest(server)
        .put("/api/genres/1")
        .set("x-auth-token", token)
        .send({ name: "1234" });
      expect(res.status).toBe(400);
    });

    it("should return 400 if genre is more than 5 characters", async () => {
      const name = new Array(52).join("a");

      const token = new User().generateAuthToken();
      const res = await supertest(server)
        .put("/api/genres/1")
        .set("x-auth-token", token)
        .send({ name });
      expect(res.status).toBe(400);
    });

    it("should return 404 if invalid id is passed", async () => {
      const token = new User().generateAuthToken();
      const genre = new Genre({ name: "genre1" });
      await genre.save();
      const _id = new mongoose.Types.ObjectId().toHexString();
      const res = await supertest(server)
        .put(`/api/genres/${_id}`)
        .set("x-auth-token", token)
        .send({ name: "genre1" });

      expect(res.status).toBe(404);
    });

    it("should return 200 if valid id is passed", async () => {
      const token = new User().generateAuthToken();
      const genre = new Genre({ name: "genre2" });
      await genre.save();
      const _id = genre._id;
      const res = await supertest(server)
        .put(`/api/genres/${_id}`)
        .set("x-auth-token", token)
        .send({ name: "genre2" });

      expect(res.status).toBe(200);
    });

    it("should save if valid", async () => {
      const token = new User().generateAuthToken();
      const genre = new Genre({ name: "genre2" });
      await genre.save();

      const _id = genre._id;
      const res = await supertest(server)
        .put(`/api/genres/${_id}`)
        .set("x-auth-token", token)
        .send({ name: "genre2" });

      const retGenre = await Genre.find({ name: "genre1" });

      expect(retGenre).not.toBeNull();
    });

    it("should return the genre if valid", async () => {
      const token = new User().generateAuthToken();
      const genre = new Genre({ name: "genre2" });
      await genre.save();
      const _id = genre._id;
      const res = await supertest(server)
        .put(`/api/genres/${_id}`)
        .set("x-auth-token", token)
        .send({ name: "genre2" });

      // expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genre2");
    });
  });
});

describe("DELETE /:id", () => {
  it("should return 401 if client is not logged in", async () => {
    const res = await supertest(server)
      .delete("/api/genres/1")
      .send({ name: "genre1" });
    expect(res.status).toBe(401);
  });
});
