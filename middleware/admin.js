import jwt from "jsonwebtoken";
import config from "config";

export default function admin(req, res, next) {
    if(!req.user.admin)
        return res.status(403).send("Forbidden, No Access");

    next()
}