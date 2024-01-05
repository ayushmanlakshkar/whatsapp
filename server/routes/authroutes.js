const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/authcontrollers')
const authmiddleware = require('../middlewares/authmiddleware')

router.post('/register', authmiddleware , authcontroller.registerUser );
router.post('/login', authmiddleware,authcontroller.loginUser );

module.exports = router;

