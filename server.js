const express = require("express");
const PORT = 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("Application is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
