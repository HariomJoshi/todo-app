const mongoose = require("mongoose");

const todoModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

const Todo = mongoose.model("Todo", todoModel);
module.exports = Todo;
