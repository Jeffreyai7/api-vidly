import supertest from "supertest";
import server from "../../index.js";
import { Genre } from "../../models/genre.js";
import { User } from "../../models/user.js";

describe("/api/genres", () => {
  beforeEach(() => server);

  afterEach(async () => {
    server.close();
    await Genre.deleteMany({});
  });

  describe("/GET", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);
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
    it("should return 401 if client is not logged in", async () => {
      const res = await supertest(server)
        .post("/api/genres")
        .send({ name: "genre1" });

      expect(res.status).toBe(401);
    });

    it("should return 400 if genre is less than 5 characters", async () => {
      const token = new User().generateAuthToken();

      const res = await supertest(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: "1" });

      expect(res.status).toBe(400);
    });

    it("should return 400 if genre is more than 5 characters", async () => {
      const token = new User().generateAuthToken();
      const name = new Array(52).join("a");

      const res = await supertest(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: name });

      expect(res.status).toBe(400);
    });

    it("should save the genre if it is valid", async () => {
      const token = new User().generateAuthToken();

      const res = await supertest(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: "genere1" });

      const genre = await Genre.find({ name: "genre1" });

      expect(genre).not.toBeNull();
    });
    it("should the genre if it is valid", async () => {
      const token = new User().generateAuthToken();

      const res = await supertest(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: "genere1" });

      const genre = await Genre.find({ name: "genre1" });

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genre1");
    });
  });
});
