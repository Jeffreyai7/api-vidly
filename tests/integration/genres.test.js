import supertest from "supertest";
import server from "../../index.js";
import { Genre } from "../../models/genre.js";

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
    });
  });
});
