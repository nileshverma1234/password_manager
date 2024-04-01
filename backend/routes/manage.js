const express  = require("express");
const protect = require('../middleware/protect');
const {createPassword, getPassword, updatePassword, deletePassword} =  require('../controllers/passwordControllers');
const decryptPass = require('../controllers/decryptionController');
const router = express.Router();

router.post('/create',protect,createPassword);
router.get('/getpass',protect, getPassword);
// router.post('/updatepass', protect, updatePassword);
router.get('/updatepass/', protect, updatePassword); 
router.get('/deletepass/:id', protect, deletePassword);
router.get('/decrypt/', protect, decryptPass);


module.exports = router;