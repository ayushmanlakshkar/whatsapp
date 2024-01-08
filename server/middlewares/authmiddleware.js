const authmiddleware = (req, res, next) => {

    if (!req.body.username || !req.body.password) {
        res.status(400).send('Please enter all the fields');
    }
    else{
        if (!req.body.confirmpassword) {
            next()
        }
        else {
            if (req.body.confirmpassword === req.body.password) {
                next()
            }
            else {
                res.status(400).send("Password does not match")
            }
        }
    }

}

module.exports = authmiddleware 