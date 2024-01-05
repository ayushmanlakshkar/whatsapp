import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { socket } from '../socket-connection/socket';
import { useSelector, useDispatch } from 'react-redux';
import { appendMessages,removeMessage } from '../store/slices/presentchatslice';
import IconButton from '@mui/material/IconButton';
import { setTyping } from '../store/slices/isTyping';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import '../styles/messagebar.css'

const Messagebar = () => {
  const [message, setMessage] = useState('')
  const user = useSelector(state => state.user.username)
  const presentChat = useSelector(state => state.presentchat)
  const isTyping = useSelector(state => state.isTyping.status)
  const dispatch = useDispatch()

  const send_message = () => {
    axios.post('http://localhost:3001/chats/send_message', { type: presentChat.type, message: message, username: user, chatname: presentChat.chatname }).then((response) => {
      dispatch(appendMessages(response.data))
      setMessage("")
      socket.emit('send_message',{
        type:presentChat.type,
        reciever: presentChat.chatname,
        key: response.data.key,
        username:response.data.username,
        message: response.data.message,
        timestamp: response.data.timestamp})
    });
    sendTypingEvent()
  }

  const sendTypingEvent = () => {
    if(!isTyping){
      socket.emit('typing', { username: user, reciever: presentChat.chatname ,key:"typing",typing:true});
      dispatch(setTyping())
    }else{
      if(message.length==0){
        socket.emit("stopped_typing",{ username: user, reciever: presentChat.chatname })
        dispatch(setTyping())
      }
    }
  };

  useEffect(() => {
    socket.on("typing", (data) => {
   dispatch(appendMessages({ username: data.username, key: data.key, message: "Typing ...",typing:true}))
  })
    socket.on("stopped_typing", (d) =>{
    dispatch(removeMessage())
    })

    return ()=>{
      socket.off("typing")
      socket.off("stopped_typing")
    }
  })

  return (
    <div className='msgbar'>
      <IconButton >
        <AttachFileIcon style={{ color: 'white' }} />
        <input type='file' style={{ display: 'none' }} />
      </IconButton>
      <input className='msginput' value={message} onChange={(e) => { setMessage(e.target.value);
                                                                        sendTypingEvent();} 
                                                                      }
       onKeyDown={(e) => e.key == 'Enter' ? send_message() : <></>} placeholder='Message' />
      <IconButton onClick={() => send_message()}>
        <SendIcon style={{ color: 'white' }} />
      </IconButton>
    </div>
  )
}

export default Messagebar
