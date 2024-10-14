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
  // store password after hashing it
  const password = await bcrypt.hash(req.body.password, salt);
  // if user already exists so no need to register it
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(200).json({
      message: "user already exists",
    });
  }
  // if not already present so go ahead and create it
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: password,
  });
  user.save();

  if (user) {
    // if user is created sucessfully
    return res.status(201).json({
      status: "Successfully created",
    });
  } else {
    // some internal error  occured
    return req.status(500).json({
      status: "Internal Server Error",
    });
  }
}

module.exports = signup;
