import mongoose from "mongoose";
import User from "./userModel.js";

const { ObjectId } = mongoose.Schema.Types;

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdBy: {
    type: ObjectId,
    ref: User,
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
