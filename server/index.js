require("dotenv").config();
const express = require("express");
const loginController = require("./controllers/login");
const signupController = require("./controllers/signup");
const getTodo = require("./controllers/getTodo");
const putTodo = require("./controllers/putTodo");
const mongoose = require("mongoose");
const auth = require("./middlewares/auth");
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
    message: "Hariom's api",
  });
});

app.post("/api/v1/login", loginController);
app.post("/api/v1/signup", signupController);
// following actions are authorized only when the user is legitimate
app.get("/api/v1/getTodos", auth, getTodo);
app.post("/api/v1/putTodos", auth, putTodo);

app.listen(port, () => {
  console.log("Listening to port " + port);
});
