const mongoose = require('mongoose');

const passwordSchema = mongoose.Schema({
    owner:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    subject:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
},
    {timestamps:true}
    ); 


const Password= mongoose.model("Password", passwordSchema);

module.exports = Password;