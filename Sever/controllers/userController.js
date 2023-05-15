const User = require('../models/user.js')

exports.createUser = async (req, res) => {
  const {username,email,password} = req.body
  try{
    const returndata = await User.create({username,email,password})
    if(returndata){
      return res.status(201).json(returndata);
    }
  }
  catch(error){
    return res.status(400).json({message:'username or password used alredy'})
  }
};

exports.getUser = async (req, res) => {
  try{
    const { userId } = req.params;
    const returnData = await User.findOne({ _id: userId });
    if (returnData) {
      return res.status(201).json(returnData);
    }
    return res.status(404).json({ message: "user. Not found" })
  }
  catch(error){
    return res.status(400).json({ message: "cannot find user" });
  }
};

exports.deleteUser = async (req, res) => {
  res.send({message:"delete user"})
};

exports.updateUser = async (req, res) => {
  res.send({message:"update user"})
};

