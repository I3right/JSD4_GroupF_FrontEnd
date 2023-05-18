const User = require("../models/user.js");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(email, password);
    const userDB = await User.findOne({ email: email });
    if (password === userDB.password) {
      return res.status(200).json(userDB);
    }
  } catch (err) {
    return res.status(400).json({ message: "email or password is wrong" });
  }
};
