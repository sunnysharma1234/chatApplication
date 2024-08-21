const mongoose = require("mongoose")

const userModel = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    fullName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:String,
        

    },
    profilePhoto:{
        type:String,
        default:"",

    },
    gender:{
        type:String,
        enum:["boy","girl"],
        required:true,
    }

},{timestamps:true})


const User = mongoose.model("User",userModel);


module.exports = User;