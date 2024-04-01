const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const getandsetToken = require('../utils/getandsetToken')
const { passwordStrength } = require('check-password-strength');


const createUser = async (req,res)=>{
    
    try {
        const {emailId, password, confirmPassword, fullName} = req.body;

        if(!emailId || !password || !confirmPassword || !fullName){
            return res.status(401).json({error:"Please provide all required feilds"});
        }
        
        if(password != confirmPassword){
            return res.status(401).json({error:"passwords do not match"});
        }
        
        // const passStrength = passwordStrength(password).value;

        // if(passStrength=="Weak" || passStrength=="Too weak"){
        //     return res.status(401).json({error:"Weak Password: use combination of symbol and letters"});
        // }

        const user = await User.findOne({emailId:emailId});

        if(user){
            return res.status(401).json({error:"User with email already exists"});
        }

        const salt = await bcrypt.genSalt(process.env.GEN_SALT);
        const hashPassword= await bcrypt.hash(password, salt);

        const createdUser= await User.create({
            emailId,
            password:hashPassword,
            fullName
        });

        if(createdUser){
            getandsetToken(createdUser._id,res);
            await createdUser.save();

            return res.status(200).json({emailId:createdUser.emailId,fullName:createdUser.fullName});
        }

    } catch (error) {
        return res.status(400).json({error:error});
    }
};



const loginUser =async (req,res)=>{
    try {
        const {emailId, password} = req.body;

        if(!emailId || !password){
            return res.status(401).json({error:"Please provide all fields"});
        }

        const user =await User.findOne({emailId});

        if(!user){
            return res.status(401).json({error:"No user Found"});
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword){
            return res.status(400).json({error:"Password do not match"});
        }

        getandsetToken(user._id, res);
        
        return res.status(201).json({fullName:user.fullName, emailId:user.emailId});

    } catch (error) {
        return res.status(400).json({error:error});
    }
};

module.exports = {createUser, loginUser};