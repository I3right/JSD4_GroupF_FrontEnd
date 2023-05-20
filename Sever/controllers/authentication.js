const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(email, password);
    const checkEmail = await User.findOne({ email: email });      // res => {username,email,password}
    if (password === checkEmail.password) {









      return res.status(200).json(userDB);
    }
    return res.status(400).json({ message: "email or password is wrong" });
  } catch (err) {
    return res.status(404).json({ message: "can't login" });
  }
};
