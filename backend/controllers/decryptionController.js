const {decryptData} = require('../cipher/cipher');

const decryptPass = (req,res)=>{
    try {
        const encryptedPassword = req.query.password;
        if(!encryptedPassword){
            return res.status(401).json({error:"Please provide value"});
        }

        
        const decryptedData = decryptData(encryptedPassword);
        return res.status(201).json({data:decryptedData});

    } catch (error) {
        return res.status(401).json({error});
    }
}

module.exports = decryptPass;