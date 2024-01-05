const express = require('express');
const router = express.Router();
const chatcontrollers = require('../controllers/chatcontrollers');

router.post('/get_messages',chatcontrollers.get_Messages)
router.post('/send_message',chatcontrollers.send_Message)

module.exports=router