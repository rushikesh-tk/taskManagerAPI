import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/user.js";
import connectDB from "./config/db.js";
import User from "./models/userModel.js";
import Task from './models/taskModel.js'

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Task.deleteMany();
    await User.insertMany(users);
    console.log("Data Import : Successful");
    process.exit();
  } catch (error) {
    console.log("Data Import : Unsuccessful");
    console.log(`Error : ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Task.deleteMany();
    console.log("Data Destruction : Successful");
    process.exit();
  } catch (error) {
    console.log("Data Destruction : Unsuccessful");
    console.log(`Error : ${error}`);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
