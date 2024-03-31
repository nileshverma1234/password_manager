const mongoose = require('mongoose');

const passwordSchema = mongoose.Schema({
    subject:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
}); 


const Password= mongoose.model("Password", passwordSchema);

module.exports = Password;