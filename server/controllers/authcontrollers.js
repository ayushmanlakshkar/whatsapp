const registerUser = (req,res)=>{
     console.log('register')
     res.send('register')
}

const loginUser = (req,res)=>{
    console.log('login')
    res.send('login')
};

module.exports = { registerUser, loginUser}