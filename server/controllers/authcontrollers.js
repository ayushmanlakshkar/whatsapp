const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        if (req.body.confirmpassword) {
            const userPresent = await User.findOne({ username: req.body.username });
            if (!userPresent) {
                let profile;
                if (req.file) {
                    profile = req.file.path
                } else {
                    profile = 'public/profilePictures/logo.png';
                }
                await User.create({ username: req.body.username, password: req.body.password, profile })
                    .then(async (user) => {
                        const token = await user.generateToken();
                        res.send({ message: `User created successfully : ${req.body.username}`, token });
                    }).catch(error => {
                        res.status(400).send(error)
                    });
            } else {
                res.status(400).send("Username already in present. Choose some other")
            }
        } else {
            res.status(400).send("Please enter all fields")
        }
    } catch (error) {
        res.status(404).send(error);
    }
}

const loginUser = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
        const matchPassword = await bcrypt.compare(req.body.password, user.password)
        if (matchPassword) {
            const token = await user.generateToken();
            res.send({ message: "User logged in", token })

        } else {
            res.status(400).send("Incorrect Password")
        }
    } else {
        res.status(400).send("No such user exists")
    }
};


const tokenLogin = (req, res) => {
    if (req.body.headers && req.body.username) {
        const token = req.body.headers.Authorization;

        if (!token) {
            res.status(400).send("Token not found");
        } else {
            const tokenParts = token.split(' ');
            if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
                res.status(400).send('Invalid token format');
            } else {
                const actualToken = tokenParts[1];
                jwt.verify(actualToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
                    if (err) {
                        res.status(400).send(err)
                    } else {
                        if (decoded.username === req.body.username) {
                            res.send("Valid Token")
                        } else {
                            res.status(400).send("Invalid token for the user")
                        }
                    }
                })

            }
        }
    } else {
        res.status(400).send("Some error occured")
    }
}

module.exports = { registerUser, loginUser, tokenLogin }