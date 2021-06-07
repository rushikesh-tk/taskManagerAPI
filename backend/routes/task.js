import express from "express";
import User from "../models/userModel.js";
import Task from "../models/taskModel.js";
import APIKEY from "../models/apikey.js";
import bcrypt from "bcryptjs";
import requireLogin from "../middleware/requireLogin.js";

const Router = express.Router();

Router.post("/createapikey", (req, res) => {
  const { applicationName, password } = req.body;

  if (!applicationName || !password) {
    return res.status(422).json("Credentials Missing");
  }

  APIKEY.findOne({ applicationName })
    .then((foundApp) => {
      if (foundApp) {
        return res.status(422).json("Application already exists");
      }

      bcrypt
        .hash(applicationName, 10)
        .then((hashedAPIKEY) => {
          const apikey = new APIKEY({
            applicationName,
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
  const { email } = req.body;

  if (!email) {
    return res.status(422).json("Email missing");
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        return res.status(422).json("User already exists");
      }

      const user = new User({
        email,
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

Router.get("/tasks/:email",  (req, res) => {
  const { email } = req.params;
  console.log(email)
  User.findOne({ email  })
    .then((_user) => {
      if (!_user) {
        return res.status(422).json({ message: "User does not exists" });
      }
      
      Task.find({ createdBy: _user._id })
        .then((result) => res.json(result))
        .catch((err) => {
          res.status(500).json("Something went wrong");
          console.log(`Error : ${err}`);
        });
    })
    .catch((err) => {
      res.status(500).json("Something went wrong");
      console.log(`Error : ${err}`);
    });

  // Task.find({ createdBy: req.user._id })
  //   .then((result) => {
  //     res.json({ result });
  //   })
  //   .catch((err) => {
  //     res.status(500).json("Something went wrong");
  //     console.log(`Error : ${err}`);
  //   });
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
    req.params.taskId,
    {
      title: req.body.title,
      content: req.body.content,
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
