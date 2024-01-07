import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket-connection/socket';
import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, Avatar, Button, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import '../styles/login.css'
import { setuser_details } from '../store/slices/userslice';
import { setstatus } from '../store/slices/isloggedslice';
import { setToastMessage } from '../store/slices/toastSlice';

const Login_in = () => {
  const user = useSelector((state) => state.user.username)
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')   
  const [showpassword, setShowpassword] = useState(false)
  const [error, setError] = useState('')
const navigate=useNavigate()



  const submit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/auth/login', { username, password }).then((response) => {
      localStorage.setItem('token', response.data.token)
      navigate(`/${username}`)
      dispatch(setToastMessage({message:response.data.message,type:true}))
    }).catch((error) => {
       dispatch(setToastMessage({message:error.response.data,type:false}))
    });
  }


  return (
    <Box id='box' component='form' onSubmit={submit}>
      <Avatar src="/broken-image.jpg" sx={{ width: 56, height: 56 }} />
      <TextField fullWidth label="Username" className='input' value={username} onChange={(e) => { setUsername(e.target.value) }} />
      <TextField
        fullWidth
        type={showpassword ? 'text' : 'password'}
        label="Password"
        className='input'
        value={password}
        onChange={(e) => { setPassword(e.target.value) }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => { setShowpassword(!showpassword) }} edge="end">
                {showpassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {error ? <div className='error'>{error}</div> : ""}
      <Button type='submit' variant="contained">Log IN</Button>
    </Box>
  )
}

export default Login_in
