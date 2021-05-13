import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const requireLogin = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("You must login first");
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json("You must login first");
    }
    const _id = payload;
    User.findById(_id).then((userData) => {
      req.user = userData;
      next();
    });
  });
};

export default requireLogin;
