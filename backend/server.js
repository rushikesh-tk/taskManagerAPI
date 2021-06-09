import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import auth from "./routes/auth.js";
import task from "./routes/task.js";
import cors from "cors";
import rateLimit from "express-rate-limit";
const PORT = 5000;

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("Application is running...");
});

var limiter = new rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 500,
});

app.use(express.json());

app.use(cors());
app.use("/api", limiter);
app.use("/api", auth);
app.use("/api", task);

app.use(function (req, res, next) {
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  next();
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
