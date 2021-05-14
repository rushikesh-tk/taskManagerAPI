import express from "express";
import Task from "../models/taskModel.js";
import requireLogin from "../middleware/requireLogin.js";

const Router = express.Router();

Router.post("/task", requireLogin, (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(422).json({ error: "Please Add All The Fields" });
  }

  req.user.password = undefined;

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
  Task.find({ createdBy: req.user._id })
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      res.status(500).json("Something went wrong");
      console.log(`Error : ${err}`);
    });
});

Router.patch("/task/:taskId", requireLogin, (req, res) => {
  Task.findByIdAndUpdate(
    req.params.taskId,
    {
      title: req.body.title,
      content: req.body.content,
    },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Task updated successfully");
      }
    }
  );
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

export default Router;
