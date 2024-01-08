const express = require('express');
const router = express.Router();
const contactcontrollers = require('../controllers/contactcontrollers');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/groupPictures')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname
      cb(null, uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage })

router.post('/get_users', contactcontrollers.getUsers)
router.post('/get_groups', contactcontrollers.getGroups)
router.post('/send_friendrequest', contactcontrollers.send_friendrequest)
router.post('/accept_friend', contactcontrollers.accept_friend)
router.post('/reject_friend', contactcontrollers.reject_friend)
router.post('/remove_friend', contactcontrollers.remove_friend)
router.post('/add_group', contactcontrollers.add_group)
router.post('/leave_group', contactcontrollers.leave_group)
router.post('/get_mycontacts', contactcontrollers.get_mycontacts)
router.post('/create_group',upload.single('profile'),contactcontrollers.create_group)
router.post('/get_friend_requests', contactcontrollers.getFriendrequests)
module.exports = router;