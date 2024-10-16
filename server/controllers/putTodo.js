const Todo = require("../models/todoModel");
const User = require("../models/userModel");

async function putTodo(req, res) {
  // takes 3 things -> title, description, email
  const { email, title, description } = req.body;
  // console.log({ email, title, description });
  if (!title || !email) {
    // a todo is not possible without a title
    return res.status(401).json({
      message: "incomplete data",
    });
  }
  try {
    // try making a new todo
    const todo = await Todo.create({
      title: req.body.title,
      description: req.body.description,
    });
    todo.save();
    if (!todo) {
      return res.status(402).json({
        message: "Not able to make todo",
      });
    }
    // if todo made, insert in user
    await User.updateOne(
      {
        email,
      },
      {
        $push: {
          todos: todo._id,
        },
      }
    );
    return res.status(202).json({
      message: "Todo added successfully",
    });
  } catch (e) {
    return res.status(404).json({
      message: "some error occured when making todo",
    });
  }
}

module.exports = putTodo;
