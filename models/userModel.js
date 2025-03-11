const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcrypt')

const userModel = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
})

// Signup
userModel.statics.signup = async function(name, email, password){
    if(!validator.isEmail(email)){
        throw new Error("Invalid Email")
    }

    if(!validator.isStrongPassword(password)){
        throw new Error('A minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required.')
    }

    const exist = await this.findOne({email})

    if(exist){
        throw new Error("Email Already Used")
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await this.create({name, email, password: hashPassword})

    return user;
}

// Login
userModel.statics.login = async function(email, password){
    const user = await this.findOne({email})

    if(!user){
        throw new Error("Invalid User")
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match){
        throw new Error("Incorrect Password")
    }
    return user;
}

module.exports = mongoose.model("User", userModel)