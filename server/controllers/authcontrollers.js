const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const registerUser = async (req, res, next) => {
    try {
        const { username, password, confirmpassword } = req.body;

        if (!username || !password) {
            return res.status(400).send('Please enter all fields');
        }

        if (confirmpassword && confirmpassword !== password) {
            return res.status(400).send('Password does not match');
        }

        const userPresent = await User.findOne({ username });

        if (userPresent) {
            return res.status(400).send('Username already in use. Choose another.');
        }

        const profile = req.file ? req.file.path : 'public/profilePictures/logo.png';

        const user = await User.create({ username, password, profile });
        const token = await user.generateToken();

        res.send({ message: `User created successfully: ${username}`, token, username: username, profile: user.profile });
    } catch (error) {
        next(error)
    }

}

const loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(400).send("No such user exists")
        }
        const matchPassword = await bcrypt.compare(req.body.password, user.password)
        if (!matchPassword) {
            return res.status(400).send("Incorrect Password")
        }
        const token = await user.generateToken();
        res.send({ message: "User logged in", token, username: user.username, profile: user.profile })
    }
    catch (error) {
        next(error)
    }
}

const tokenLogin = async (req, res) => {

    if (!req.body.headers || !req.body.username) {
        return res.status(400).send("Some error occured")
    }

    const token = req.body.headers.Authorization;
    const tokenParts = token.split(' ');
    if (!token || tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(400).send("Invalid Token");
    }

    const actualToken = tokenParts[1];
    jwt.verify(actualToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(400).send(err)
        }
        if (decoded.username !== req.body.username) {
            return res.status(400).send("Invalid token for the user")
        }
    })
    const user = await User.findOne({ username: req.body.username })
    res.send({ message: "Valid Token", username: user.username, profile: user.profile })


}

const check = async (req, res) => {
    const users = await User.find({})
    res.send(users)
}

module.exports = { registerUser, loginUser, tokenLogin, check }