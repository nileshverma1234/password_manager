const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect =async (res, res, next)=>{
    try {
        const token= req.cookies.jwt;

        if(!token){
            return res.status(500).json({error:"No token Available"});
        }

        const verify = jwt.verify(token,process.env.JWT_SECRET);

        if(!verify){
            return res.status(401).json({error:"Invald Token"});
        }

        const user = User.findById(verified.userID).select("-password");

        if(!user){
            return res.status(401).json({error:"User Not Found"});
        }

        req.user=user;

        next();
    } catch (error) {
        return res.status(501).json({error:error});
    }
}

module.exports = protect;