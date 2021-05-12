import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/user.js";
import connectDB from "./config/db.js";
import User from "./models/userModel.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(users);
    console.log("Data Imported Successfully");
    process.exit();
  } catch (error) {
    console.log(`Error found while importing : ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    console.log("Data Destroyed Successfully");
    process.exit();
  } catch (error) {
    console.log(`Error found while deleting : ${error}`);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
