import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, Avatar, Button } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import '../styles/login.css'
import { setuser_details } from '../store/slices/userslice';
import { setstatus } from '../store/slices/isloggedslice';
import { setcontacts } from '../store/slices/contactslice';
import { ToastContainer } from 'react-toastify';
import { setToastMessage } from '../store/slices/toastSlice';
import { useNavigate } from 'react-router-dom';
import { setchat } from '../store/slices/chatslice';
import { BASE_URL } from '../services/Api';

const Sing_up = () => {
  const user = useSelector((state) => state.user.username)
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')
  const [profile,setProfile] = useState(null)
  const navigate = useNavigate()
  

  const submit = async (e) => {
    e.preventDefault();

    const formData=new FormData()
    formData.append('username', username)
    formData.append('password', password)
    formData.append('confirmpassword',confirmpassword)
    formData.append('profile',profile)

    await axios.post(`${BASE_URL}auth/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((response) => {
      localStorage.setItem('token', response.data.token)   
      navigate(`/${username}`)
      dispatch(setToastMessage({message:response.data.message,type:true}))
    }).catch((error) => {
      if (error.response.data.validationErrors) {
        const value = Object.values(error.response.data.validationErrors)[0]
        dispatch(setToastMessage({ message: value, type: false }))
      } else {
        dispatch(setToastMessage({ message: error.response.data, type: false }))
      }
    });
  }

  return (
    <Box id='box' component='form' onSubmit={submit}>
      <div className='profile'>
      {profile && (
        <img
          src={URL.createObjectURL(profile)}
          alt="Profile"
          className='image_shower'
        />
      )}
     <label className='profile_picture' htmlFor="profile-input">
        Choose profile picture
        <input
          type="file"
          id="profile-input"
          accept="image/*"
          onChange={(e)=>setProfile(e.target.files[0])}
          style={{ display: 'none' }}
        />
      </label>
      
      </div>
      <TextField fullWidth label="Username" className='input' value={username} onChange={(e) => { setUsername(e.target.value) }} />
      <TextField fullWidth type='password' label="Password" className='input' value={password} onChange={(e) => { setPassword(e.target.value) }} />
      <TextField fullWidth type='password' label="Confirm Password" className='input' value={confirmpassword} onChange={(e) => { setConfirmpassword(e.target.value) }} />
      <Button type='submit' variant="contained">Sing Up</Button>
    </Box>
  )
}

export default Sing_up
