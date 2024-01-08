const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],
        unique: [true, 'Username already exists'],
        maxlength: [10, 'Username maxlength must be 10 characters'],
        minlength: [4, 'Username minlength must be at least 4 characters']
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [8, 'Password minlength must be at least 8 characters']
    },
    profile:{
        type: String,
    }
    ,
    socket_id: {
        type: String,
        default: ''
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        sparse: true,
        index: true,
    }],
    friend_requests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        sparse: true,
        index: true,
    }],
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        sparse: true,
        index: true,
    }]
});

userschema.post('validate', function (error, doc, next) {
    if (error.errors) {
        const validationErrors = {};
        Object.keys(error.errors).forEach((key) => {
            validationErrors[key] = error.errors[key].message;
        });
        next({ validationErrors });
    } else {
        next();
    }
});

userschema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, saltRound);
        user.password = hashPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

userschema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            username: this.username
        },
         process.env.JWT_SECRET_KEY, 
         {
            expiresIn: '3h'
        }
        )
    } catch (error) {
        return ({ error })
    }
}


const User = mongoose.model('User', userschema);
module.exports = User;
