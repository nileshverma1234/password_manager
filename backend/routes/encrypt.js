const express  = require("express");

const router = express.Router();

router.get('/work',(req,res)=>{
    res.send("Work");
});


module.exports = router;