const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// v1

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     console.log(email, password);
//     const userDB = await User.findOne({ email: email });
//     if (password === userDB.password) {
//       return res.status(200).json(userDB);
//     }
//   } catch (err) {
//     return res.status(400).json({ message: "email or password is wrong" });
//   }
// };


// v2

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by their email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the entered password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Return a success response
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};


