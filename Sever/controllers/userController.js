const User = require("../models/user.js");
const bcrypt = require("bcrypt");


// exports.createUser = async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const returndata = await User.create({ username, email, password });
//     if (returndata) {
//       return res.status(201).json(returndata);
//     }
//   } catch (error) {
//     return res
//       .status(400)
//       .json({ message: "username or email used already" });
//   }
// };



exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const saltRounds = 10;
    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const returndata = await User.create({ username, email, password: hashedPassword });
    if (returndata) {
      return res.status(201).json(returndata);
    }
  } catch (error) {
    return res.status(400).json({ message: "username or email used already" });
  }
};



exports.getAllUser = async (req, res) => {
  try {
    const returnData = await User.find();
    if (returnData) {
      return res.status(201).json(returnData);
    }
    return res.status(404).json({ message: "user. Not found" });
  } catch (error) {
    return res.status(400).json({ message: "cannot find user" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const returnData = await User.findOne({ _id: userId });
    if (returnData) {
      return res.status(201).json(returnData);
    }
    return res.status(404).json({ message: "user. Not found" });
  } catch (error) {
    return res.status(400).json({ message: "cannot find user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const returnData = await User.findOneAndRemove({ _id: userId });
    if (returnData) {
      return res.status(201).json({ message: "User has been removed" });
    }
    return res.status(404).json({ message: "user. Not found" });
  } catch (error) {
    return res.status(400).json({ message: "userid not match" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, password } = req.body;
    const returnData = await User.findOneAndUpdate(
      { _id: userId },
      { username, email, password }
    );
    if (returnData) {
      return res.status(201).json({ message: "User has been update" });
    }
  } catch (error) {
    return res.status(400).json({ message: "cannot updatea user" });
  }
};
