import apikey from "../models/apikey.js";

const requireLogin = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("You must login first");
  }

  const APIKEY = authorization.replace("Bearer ", "");

  apikey.findOne({ apikey: APIKEY }).then((data) => {
    if (data) {
      next();
    } else {
      return res.status(422).json({ message: "Unauthorized Request" });
    }
  });
};

export default requireLogin;
