const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwt_token = process.env.JWT_SECRET;
async function login(req, res) {
  if (!req.body.email || !req.body.password) {
    return req.status(400).json({
      message: "Data incomplete",
    });
  }

  const user = User.findOne({ email: req.body.email });
  if (!user) {
    return req.status(404).json({
      message: "User not found",
    });
  }
  let isMatch = await user.comparePassword(req.body.password);
  if (!isMatch) {
    return req.status(404).json({
      message: "Passwords does not match",
    });
  }
  const token = jwt.sign({ userid: user._id }, jwt_token, { expiresIn: "2h" });
  res.status(200).json({
    token: token,
  });
}

module.exports = login;
