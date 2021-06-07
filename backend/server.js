import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
//import auth from "./routes/auth.js";
import task from "./routes/task.js";
import cors from "cors";
const PORT = 5000;

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("Application is running...");
});

app.use(express.json());
app.use(cors());
//app.use(auth);
app.use(task);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));