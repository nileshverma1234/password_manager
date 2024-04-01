const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')

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


// app.get('/',(req,res)=>{
//     res.send("<h1>Hello Sir</h1>");
// });



app.listen(port, ()=>{
    connectDB();
    console.log(`Server is started on port ${port}`);
});