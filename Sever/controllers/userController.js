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

exports.getAlluser = async (req, res) => {
  res.send({message:"all user"})
};

exports.getUser = async (req, res) => {
  res.send({message:"one user"})
};

exports.deleteUser = async (req, res) => {
  res.send({message:"delete user"})
};

exports.updateUser = async (req, res) => {
  res.send({message:"update user"})
};

