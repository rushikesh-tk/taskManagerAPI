import express from "express";
import User from "../models/userModel.js";
import Task from "../models/taskModel.js";
import APIKEY from "../models/apikey.js";
import bcrypt from "bcryptjs";
import requireLogin from "../middleware/requireLogin.js";
import sanitize from "mongo-sanitize";

const Router = express.Router();

Router.post("/createapikey", (req, res) => {
  if (!req.body.applicationName || !req.body.password) {
    return res.status(422).json("Credentials Missing");
  }

  APIKEY.findOne({ applicationName: sanitize(req.body.applicationName) })
    .then((foundApp) => {
      if (foundApp) {
        return res.status(422).json("Application already exists");
      }

      bcrypt
        .hash(req.body.applicationName, 10)
        .then((hashedAPIKEY) => {
          const apikey = new APIKEY({
            applicationName: req.body.applicationName,
            apikey: hashedAPIKEY,
          });

          apikey
            .save()
            .then((apikey) => res.json(apikey))
            .catch((err) => {
              throw err;
            });
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      res.status(500).json({ message: "Unexpected Error" });
      console.log(`Error : ${err}`);
    });
});

Router.post("/newuser", (req, res) => {
  if (!req.body.email) {
    return res.status(422).json("Email missing");
  }

  User.findOne({ email: sanitize(req.body.email) })
    .then((foundUser) => {
      if (foundUser) {
        return res.status(422).json("User already exists");
      }

      const user = new User({
        email: req.body.email,
      });

      user
        .save()
        .then((_user) => {
          return res.json(_user);
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      res.status(422).json("User not created");
      console.log(`Error : ${err}`);
    });
});

Router.post("/task", requireLogin, (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(422).json({ error: "Please Add All The Fields" });
  }

  const task = new Task({
    title: title,
    content: content,
    createdBy: req.user._id,
  });

  task
    .save()
    .then((result) => {
      res.json({ task: result });
    })
    .catch((err) => {
      res.status(500).json("Something went wrong");
      console.log(err);
    });
});

Router.get("/tasks", requireLogin, (req, res) => {
  const { _id } = req.user;

  Task.find({ createdBy: _id })
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(500).json("Something went wrong");
      console.log(`Error : ${err}`);
    });
});

Router.delete("/task/:taskId", requireLogin, (req, res) => {
  Task.findOne({ _id: req.params.taskId })
    .then((task) => {
      if (!task) {
        return res.status(422).json("Invalid taskId");
      }

      if (task.createdBy._id.toString() === req.user._id.toString()) {
        task
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            throw err;
          });
      }
    })
    .catch((err) => {
      res.status(500).json("Something went wrong");
      console.log(`Error : ${err}`);
    });
});

Router.put("/task/:taskId", requireLogin, (req, res) => {
  Task.findByIdAndUpdate(
    sanitize(req.params.taskId),
    {
      title: sanitize(req.body.title),
      content: sanitize(req.body.content),
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

export default Router;
