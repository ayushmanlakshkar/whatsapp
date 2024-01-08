const express = require('express');
const router = express.Router();
const chatcontrollers = require('../controllers/chatcontrollers');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/chatPictures')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' +req.body.sender+ file.originalname
      cb(null, uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage })


router.post('/get_messages',upload.single('image'),chatcontrollers.get_Messages)
router.post('/send_message',upload.single('image'),chatcontrollers.send_Message)

module.exports=router