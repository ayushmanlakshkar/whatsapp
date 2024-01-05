const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please enter a username"],
        unique: [true, 'username already exist'],
        maxlength: [10, 'maxlength must be 10 characters'],
        minlength: [4, 'minlength must be at least 4 characters']
    },
    password: {
        type: String,
        required: [true, "please enter a username"],
        minlength: [8, 'minlength must be at least 8 characters']
    },
    socket_id:{
        type: String,
        default: ''
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User',sparse: true,
    index: true,}],
    friend_requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User',sparse: true,
    index: true,}],
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group',sparse: true,
    index: true, }]
});

const User = mongoose.model('User', userschema);

module.exports = User;
