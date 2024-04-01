const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')

dotenv.config();

const connectDB =require('./utils/connectDB');
const manager = require('./routes/manage');
const users = require('./routes/users');


const app = express();
dotenv.config();
const port= process.env.PORT;


app.use(express.json());
app.use(cookieParser());

app.use('/api/user', users);

app.use('/api/manage', manager);


app.get('/',(req,res)=>{
    return res.send("working");
});


app.listen(port, ()=>{
    connectDB();
    console.log(`Server is started on port ${port}`);
});