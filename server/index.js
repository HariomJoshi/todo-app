require("dotenv").config();
const express = require("express");
const loginController = require("./controllers/login");
const signupController = require("./controllers/signup");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const DB_LINK = process.env.CONNECTION;
const port = process.env.PORT;

mongoose
  .connect(DB_LINK, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection failed", err));

app.get("/", (req, res) => {
  // controller calling here
  res.json({
    message: "Hariom",
  });
});

app.post("/api/v1/login", loginController);
app.post("/api/v1/signup", signupController);

app.listen(port, () => {
  console.log("Hariom");
});
