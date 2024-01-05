import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, Avatar, Button } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import '../styles/login.css'
import { setuser_details } from '../store/slices/userslice';
import { setstatus } from '../store/slices/isloggedslice';
import { setcontacts } from '../store/slices/contactslice';

const Sing_up = () => {
  const user = useSelector((state) => state.user.username)
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')

  const submit = async (e) => {
    e.preventDefault();
    dispatch(setuser_details(username))
    dispatch(setstatus(true))
    // dispatch(setcontacts(username))
    // await axios.post('http://localhost:3001/register', { username, password, confirmpassword }).then(() => {
    // }).catch(() => {
    //   console.log('cannot find')
    // });
  }

  return (
    <Box id='box' component='form' onSubmit={submit}>
      <Avatar src="/broken-image.jpg" sx={{ width: 56, height: 56 }} />
      <TextField fullWidth label="Username" className='input' value={username} onChange={(e) => { setUsername(e.target.value) }} />
      <TextField fullWidth type='password' label="Password" className='input' value={password} onChange={(e) => { setPassword(e.target.value) }} />
      <TextField fullWidth type='password' label="Confirm Password" className='input' value={confirmpassword} onChange={(e) => { setConfirmpassword(e.target.value) }} />
      <Button type='submit' variant="contained">Log IN</Button>
    </Box>
  )
}

export default Sing_up
