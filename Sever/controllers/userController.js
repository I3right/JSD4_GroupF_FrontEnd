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
//     return badge
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

    const returndata = await User.create({ username, email, password: hashedPassword, height: 0, weight: 0,fullname : "", gender: "", location: "", bio: "", userPhoto :"" });
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
    console.log(userId);
    let { username, fullname, birthdate, gender, weight, height, location, bio, userPhoto } = req.body
    
    // const foundUser = await userModel.find({username})
    
    
    const returnData = await User.findOneAndUpdate(
      { _id: userId },
      { username, fullname, birthdate, gender, weight, height, location, bio, userPhoto }
    );
    if (returnData) {
      return res.status(201).json({ message: "User has been update" });
    }
  } catch (error) {
    return res.status(400).json({ message: "cannot updatea user" });
  }
};


exports.getUserHeight = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId)
    const user = await User.findOne({ _id: userId });
    if (user) {
      const height = user.height;
      return res.status(200).json({ height });
    }
    console.log(height)
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    return res.status(400).json({ message: "Cannot get user height" });
  }
};

exports.getUserWeight = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId });
    if (user) {
      const weight = user.weight;
      return res.status(200).json({ weight });
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    return res.status(400).json({ message: "Cannot get user weight" });
  }
};

exports.getUserBadge = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId });
    if (user) {
      const badge = user.badge;
      return res.status(200).json({ badge });
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    return res.status(400).json({ message: "Cannot get user weight" });
  }
};

exports.addBadge = async (req, res) => {
  try {
    const { userId } = req.params;
    const { badge } = req.body;

    const user = await User.findById(userId);
    console.log(user)
    if (user) {
      user.badge.push(badge); 
      await user.save();
      console.log(badge)
      return res.status(200).json({ message: "Badge added successfully" });
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to add badge" });
  }
};

