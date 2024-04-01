const mongoose = require('mongoose');

const userModel = mongoose.Schema(
    {
        emailId:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        fullName:{
            type:String,
            required:true,
        }
    },
    
    {timestamps:true}
    
);

const User = mongoose.model("User",userModel);

module.exports = User;