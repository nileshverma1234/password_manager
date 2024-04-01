const Password = require('../models/passwordModel')

const createPassword = async(req,res)=>{
    try{
        const {subject, password} = req.body;

        if(!subject || !password){
            return res.status(401).json({error:"Provide all required fields"});
        }

        // Encrypting the password

        const pass = await Password.create({
            owner:req.user._id,
            subject,
            password
        });

        await pass.save();

        return res.status(201).json({message:"Password sucessfully saved"});
    }
    catch(error){
        res.status(400).json({error:error});
    }
};

const getPassword= async (req,res)=>{
    try {
        const userId=req.user._id;
        const data= await Password.find({owner:userId});
        // decrypting the password
        return res.status(200).json({data});
    } catch (error) {
        return res.status(400).json({error:error});
    }
};

const updatePassword = async (req,res)=>{
    try {
        const {passId, password} = req.query;

        if(!passId || !password){
            return res.status(400).json({error:"Please Provide all fields"});
        }

        const check = await Password.findOne({_id:passId});

        if(!check){
            return res.status(401).json({error:"no password wit provided id available"});
        }

        // encrypt password

        const up = await Password.updateOne({_id:passId}, {$set:{password}});

        if(!up){
            return res.status(400).json({error:"Unable to update password"});
        }

        return res.status(200).json({message:"Sucessfully updated password"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({error:error});
    }
};


const deletePassword = async (req, res)=>{
    try {
        const passId= req.params.id;

        const avail = await Password.findOne({_id:passId});

        if(!avail){
            return res.status(401).json({error:"NO password with provided id  found"});
        }

        const pass= await Password.deleteOne({_id:passId});
        
        return res.status(201).json({message: "Deleted Sussfully"});
    } catch (error) {
        console.log(error);
        return res.status(201).json({error: error});
    }
}



module.exports = {createPassword, getPassword, updatePassword, deletePassword};