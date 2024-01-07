import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { socket } from '../socket-connection/socket';
import { useSelector, useDispatch } from 'react-redux';
import { appendMessages, removeMessage } from '../store/slices/presentchatslice';
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
    axios.post('http://localhost:3001/chats/send_message', { type: presentChat.type, message: message, username: user, chatname: presentChat.chatname }).then(async (response) => {
      setMessage("")
      dispatch(appendMessages(response.data))
      socket.emit('send_message', {
        type: presentChat.type,
        reciever: presentChat.chatname,
        key: response.data.key,
        username: response.data.username,
        message: response.data.message,
        timestamp: response.data.timestamp
      })
    });
  }


  const sendTypingEvent = () => {
    if (message.length == 0) {
      socket.emit("stopped_typing", { username: user, reciever: presentChat.chatname, type: presentChat.type })
      dispatch(setTyping(false))
    } else {
      if (!isTyping) {
        socket.emit('typing', { username: user, reciever: presentChat.chatname, type: presentChat.type, typing: true });
      }
      dispatch(setTyping(true))
    }
  };

  useEffect(() => {
    socket.on("typing", (data) => {
      if (data.type == "friends") {
        if (data.type == presentChat.type && data.username == presentChat.chatname) {
          dispatch(appendMessages({ username: data.username, key: data.key, message: "Typing ...", typing: true }))
        }
      } else {
        if (data.type == presentChat.type && data.reciever == presentChat.chatname) {
          dispatch(appendMessages({ username: data.username, key: data.key, message: "Typing ...", typing: true }))
        }
      }
    })

    socket.on("stopped_typing", (data) => {
      if (data.type == "friends") {
        if (data.type == presentChat.type && data.username == presentChat.chatname) {
          dispatch(removeMessage(data.key))
        }
      } else {
        if (data.type == presentChat.type && data.reciever == presentChat.chatname) {
          dispatch(removeMessage(data.key))
        }
      }

    })

    return () => {
      socket.off("typing")
      socket.off("stopped_typing")
    }
  })

  useEffect(() => {
    sendTypingEvent();
  }, [message])

  return (
    <div className='msgbar'>
      <IconButton >
        <AttachFileIcon style={{ color: 'white' }} />
        <input type='file' style={{ display: 'none' }} />
      </IconButton>
      <input className='msginput' value={message} onChange={(e) => { setMessage(e.target.value) }}

        onKeyDown={(e) => e.key == 'Enter' ? send_message() : <></>} placeholder='Message' />
      <IconButton onClick={() => send_message()}>
        <SendIcon style={{ color: 'white' }} />
      </IconButton>
    </div>
  )
}

export default Messagebar
