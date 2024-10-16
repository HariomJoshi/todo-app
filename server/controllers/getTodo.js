const User = require("../models/userModel");

async function getTodo(req, res) {
  // console.log(req);
  const email = req.query.email;
  console.log({ email });
  if (!email) {
    return res.status(404).json({
      message: "email not present in body",
    });
  }
  // gmail is present in request
  try {
    const todos = await User.findOne({ email: email }).populate("todos");
    if (!todos) {
      // user not found
      return res.status(400).json({
        message: "No user present with specified email id",
      });
    }
    // if everyting is alright return all the todos
    return res.status(202).json({
      // return todos only, nothing other than that
      todos: todos.todos,
    });
  } catch (e) {
    // some error occured while searching for user
    return res.status(400).json({
      message: "Some error occured while fetching todos",
    });
  }
}

module.exports = getTodo;
