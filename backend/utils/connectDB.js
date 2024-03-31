const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        const uri= process.env.MONGO_URI;
        const res=await mongoose.connect(uri);
        console.log(`MongoDB connected Sucessfully to host ${res.connections[0].host}`);
    } catch (error) {
        console.log(error.message);
    }

};

module.exports= connectDB;