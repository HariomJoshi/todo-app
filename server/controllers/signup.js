const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// controller to signup a user
async function signup(req, res) {
  if (!req.body.name || !req.body.email || !req.body.password) {
    // if request is incomplete
    return res.status(400).json({
      message: "All fields not present",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  // store password after hashing it
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: password,
  });
  user.save();

  if (user) {
    return res.status(201).json({
      status: "Successfully created",
    });
  } else {
    return req.status(500).json({
      status: "Internal Server Error",
    });
  }
}

module.exports = signup;
