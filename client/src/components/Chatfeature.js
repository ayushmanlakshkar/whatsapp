import React from 'react'
import '../styles/chatfeature.css';
import { useSelector, useDispatch } from 'react-redux'
import MenuIcon from '@mui/icons-material/Menu';
import { setcollapsed } from '../store/slices/navbarslice';
import { Button } from '@mui/material';

const Chatfeature = () => {
  const iscollapsed = useSelector(state => state.navbar.status)
  const presentChat = useSelector(state => state.presentchat)
  const dispatch = useDispatch()

  const collapsenavbar = () => {
    dispatch(setcollapsed(!iscollapsed))
  }

  return (
    <div className='chatfeaturebar'>
      <button className='collapse-button' onClick={collapsenavbar}><MenuIcon color='disabled' /></button>
      <span className='chatfeature-chatname'>{presentChat.chatname ? presentChat.chatname : "Whatsapp"}</span>
      <span className='leave_button'>
      <Button  variant="contained" color="error" >
        {presentChat.type=="friends" ? "Remove friend" :"Leave Group"}
      </Button>
      </span>
    </div>
  )
}

export default Chatfeature
