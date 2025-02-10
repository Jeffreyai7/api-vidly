import { User } from "../../../models/user.js";
import config from "config";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

describe("user.generateAuthToken", () => {
  it("should return a valid JWT", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      admin: true,
    };
    // const payload = { _id: 1, isAdmin: true };

    const user = new User(payload);

    const token = user.generateAuthToken();

    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    expect(decoded).toMatchObject(payload);
  });
});
