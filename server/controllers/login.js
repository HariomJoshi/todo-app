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

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      // no user found with such email
      return req.status(404).json({
        message: "User not found",
      });
    }

    // user found with an email so check if password is correct
    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(404).json({
          message: "Passwords does not match",
        });
      }

      if (err) {
        return res.status(400).json({
          message: "Some error occured",
        });
      }

      // password matches
      const token = jwt.sign({ userid: user._id }, jwt_token, {
        expiresIn: "2h",
      });
      res.status(200).json({
        name: user.name,
        email: user.email,
        token: token,
      });
    });
  } catch (e) {
    return res.status(400).json({
      message: "Some error occured while logging in",
    });
  }
}

module.exports = login;
