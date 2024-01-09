import React from 'react'
import axios from 'axios';
import '../styles/chatfeature.css';
import { useSelector, useDispatch } from 'react-redux'
import MenuIcon from '@mui/icons-material/Menu';
import { setcollapsed } from '../store/slices/navbarslice';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setChatname, setMessages } from '../store/slices/presentchatslice';
import { setToastMessage} from '../store/slices/toastSlice';
import { RemoveOneChat } from '../store/slices/contactslice';
import { BASE_URL } from '../services/Api';

const Chatfeature = () => {
  const iscollapsed = useSelector(state => state.navbar.status)
  const user = useSelector(state => state.user.username)
  const presentChat = useSelector(state => state.presentchat)
  const toastMessage = useSelector(state => state.toast.message)
  const dispatch = useDispatch()

  const collapsenavbar = () => {
    dispatch(setcollapsed(!iscollapsed))
  }

  const reset_presentchat = async () => {
      dispatch(setChatname({ chatname: '', type: '',profile:"" }))
      dispatch(setMessages([]))
  }
  const removeFriend = async () => {
    await axios.post(`${BASE_URL}contact/remove_friend`, { username: user, friend: presentChat.chatname })
      .then(async (response) => {
        dispatch(setToastMessage({message: response.data,type:true}))
        dispatch(RemoveOneChat({type:"friends",name:presentChat.chatname}))
        reset_presentchat()
       })
       .catch((error) => {
         dispatch(setToastMessage({message: error.response.data,type:false}));
       })
  }

  const leaveGroup = async () => {
    await axios.post(`${BASE_URL}contact/leave_group`, { username: user, groupname: presentChat.chatname })
      .then(async (response) => {
       dispatch(setToastMessage({message: response.data,type:true}))
       dispatch(RemoveOneChat({type:"groups",name:presentChat.chatname}))
       reset_presentchat()
      })
      .catch((error) => {
        dispatch(setToastMessage({message: error.response.data,type:false}));
      })
  }

  return (
    <div className='chatfeaturebar'>
      <button className='collapse-button' onClick={collapsenavbar}><MenuIcon color='disabled' /></button>
      <span className='chatfeature-chatname'>{presentChat.chatname ? presentChat.chatname : "Whatsapp"}</span>
      {presentChat.chatname ? <span className='leave_button'>
        <Button variant="contained" color="error" onClick={presentChat.type == "friends" ? removeFriend : leaveGroup}>
          {presentChat.type == "friends" ? "Remove friend" : "Leave Group"}
        </Button>
      </span> : <></>}
    </div>
  )
}

export default Chatfeature
