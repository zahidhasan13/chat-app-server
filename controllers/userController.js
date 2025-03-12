const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// Signup
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.signup(name, email, password);
    const token = createToken(user._id);
    res.status(200).json({ name, email, token });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

// get All User
const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get Single user
const getSingleUser = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(404).json({ message: "Invalid ID" });
  }

  try{
    const user = await User.findById(id)
    res.status(200).json(user)
  }catch(err){
    res.status(400).json({Error: err.mnessage})
  }
}

module.exports = {
  signup,
  login,
  allUsers,
  getSingleUser
};
