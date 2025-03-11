const User = require('../models/userModel')
const jwt = require('jsonwebtoken');

const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "3d"})
}

// Signup
const signup = async(req,res)=>{
    const {name, email, password} = req.body;

    try{
        const user = await User.signup(name, email, password)
        const token = createToken(user._id)
        res.status(200).json({name, email, token})
    }catch(err) {
        res.status(400).json({Error: err.message})
    }
}

// get All User


module.exports = {
    signup
}