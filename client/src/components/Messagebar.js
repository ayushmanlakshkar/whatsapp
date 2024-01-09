import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { socket } from '../socket-connection/socket';
import { useSelector, useDispatch } from 'react-redux';
import { appendMessages, removeMessage } from '../store/slices/presentchatslice';
import IconButton from '@mui/material/IconButton';
import { setTyping } from '../store/slices/isTyping';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import { setToastMessage } from '../store/slices/toastSlice';
import '../styles/messagebar.css'
import { BASE_URL } from '../services/Api';

const Messagebar = () => {
  const [message, setMessage] = useState('')
  const [image, setImage] = useState(null)
  const user = useSelector(state => state.user.username)
  const presentChat = useSelector(state => state.presentchat)
  const isTyping = useSelector(state => state.isTyping.status)
  const dispatch = useDispatch()

  console.log(image)
  const send_message = () => {
    if (message||image) {
      const formData = new FormData();
      const dataObject = {
        'type': presentChat.type,
        'message': message,
        'image': image,
        'username': user,
        'chatname': presentChat.chatname
      };

      Object.entries(dataObject).forEach(([key, value]) => {
        formData.append(key, value);
      });

      axios.post(`${BASE_URL}chats/send_message`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }).then(async (response) => {
        setMessage("")
        setImage(null)
        dispatch(appendMessages(response.data))
        socket.emit('send_message', {
          type: presentChat.type,
          reciever: presentChat.chatname,
          key: response.data.key,
          username: response.data.username,
          image: response.data.image,
          message: response.data.message,
          timestamp: response.data.timestamp
        })
      });
    } else {
      dispatch(setToastMessage({ message: "Type a message to send", type: false }))
    }

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
      <label className='image_label' htmlFor="image_input">
        <AttachFileIcon style={{ color: 'white' }} />
        <input
          type="file"
          id="image_input"
          accept="image/*"
          onChange={(e) => { setImage(e.target.files[0]) }}
          style={{ display: 'none' }}
        />
      </label>
      {image ? <CancelIcon className='cancel_image' onClick={() => setImage(null)} /> : ''}
      <input className='msginput' value={message} onChange={(e) => { setMessage(e.target.value) }}
        onKeyDown={(e) => e.key == 'Enter' ? send_message() : <></>} placeholder='Message' />
      <IconButton onClick={() => send_message()}>
        <SendIcon style={{ color: 'white' }} />
      </IconButton>
    </div>
  )
}

export default Messagebar
