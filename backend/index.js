const express = require('express');
const dotenv = require('dotenv');


const connectDB =require('./utils/connectDB');
const encrypt = require('./routes/encrypt');

const app = express();
dotenv.config();
const port= process.env.PORT;

// app.use('/api', encrypt);


app.get('/',(req,res)=>{
    res.send("<h1>Hello Sir</h1>");
});



app.listen(port, ()=>{
    connectDB();
    console.log(`Server is started on port ${port}`);
});