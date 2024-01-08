const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/authcontrollers')
const authmiddleware = require('../middlewares/authmiddleware')

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/profilePictures')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname
      cb(null, uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage })

router.post('/register',upload.single('profile'), authmiddleware, authcontroller.registerUser );
router.post('/login',authcontroller.loginUser );
router.post('/token_login', authcontroller.tokenLogin)
module.exports = router;

