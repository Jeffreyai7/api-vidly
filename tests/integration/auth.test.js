import supertest from "supertest";
import server from "../../index.js";
import { User } from "../../models/user.js";
import { Genre } from "../../models/genre.js";

describe("auth middleware", () => {
  // beforeEach(() => server);

  afterEach(async () => {
    await Genre.deleteMany({});
    await new Promise((resolve) => server.close(resolve));
  });

  let token;
  const exec = () => {
    return supertest(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name: "genre1" });
  };

  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  it("should return 401 if no token is provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 if  token is invalid", async () => {
    token = "a";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 200 if  token is invalid", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
