import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import sanitize from "mongo-sanitize";

const Router = express.Router();

Router.post("/signup", (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(422).json({ error: "Please enter all the fields" });
  }

  User.findOne({ email: sanitize(req.body.email) }).then((savedUser) => {
    if (savedUser) {
      return res.status(422).json({ error: "User Already Exists" });
    }

    bcrypt
      .hash(password, 10)
      .then((hashedPassword) => {
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        });

        user
          .save()
          .then((_user) => {
            res.json({ message: "Signing Up : Successful" });
          })
          .catch((err) => {
            res.json({ message: "Signing Up : Unsuccessful" });
            console.log(`Error : ${err}`);
          });
      })
      .catch((err) => {
        res.status(500).json({ message: "Signing Up : Unsuccessful" });
        console.log(`Error : ${err}`);
      });
  });
});

Router.post("/signin", (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(422).json("Email or Password is missing");
  }

  User.findOne({ email: sanitize(req.body.email) })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json("Invalid Email or Password");
      }

      bcrypt
        .compare(req.body.password, savedUser.password)
        .then((doMatch) => {
          if (doMatch) {
            const token = jwt.sign(
              { _id: savedUser._id },
              process.env.JWT_SECRET
            );
            const { _id, name, email } = savedUser;
            res.json({
              token,
              user: {
                _id,
                name,
                email,
              },
            });
          } else {
            return res.status(422).json("Invalid Email or Password");
          }
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      res.status(500).json("Something went wrong");
      console.log(`Error : ${err}`);
    });
});

export default Router;
