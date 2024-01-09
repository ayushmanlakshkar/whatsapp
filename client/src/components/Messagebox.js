import React, { useEffect } from 'react'
import axios from 'axios'
import { socket } from '../socket-connection/socket'
import { useSelector, useDispatch } from 'react-redux'
import { appendMessages, setMessages } from '../store/slices/presentchatslice'
import { BASE_URL } from '../services/Api'
import '../styles/messagebox.css'

const Messagebox = () => {
  const user = useSelector(state => state.user.username)
  const presentChat = useSelector(state => state.presentchat)
  const navbar_collapsed = useSelector(state => state.navbar.status)
  const dispatch = useDispatch()

  const get_messages = async () => {
    await axios.post(`${BASE_URL}chats/get_messages`, { type: presentChat.type, chatname: presentChat.chatname, username: user }).then((response) => {
      dispatch(setMessages(response.data));
    })
  }

  const scrollToBottom = () => {
    const messagesContainer = document.getElementById('messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  };


  const image_url = (url) => {
    const imageURL = BASE_URL + url.substring(7)
    return imageURL
  }

  useEffect(() => {
    socket.on("send_message", (data) => {
      if (data.type == "friends") {
        if (data.type == presentChat.type && data.username == presentChat.chatname) {
          dispatch(appendMessages({ type: data.type, username: data.username, key: data.key, message: data.message,image:data.image, timestamp: data.timestamp }));
        }
      } else {
        if (data.type == presentChat.type && data.reciever == presentChat.chatname) {
          dispatch(appendMessages({ type: data.type, username: data.username, key: data.key, message: data.message,image:data.image, timestamp: data.timestamp }));
        }
      }
    });

    get_messages();
    return () => {
      socket.off("send_message")
    }
  }, [presentChat.type, presentChat.chatname])


  useEffect(() => {
    if (navbar_collapsed) {
      scrollToBottom();
    }
  }, [navbar_collapsed])

  useEffect(() => {
    scrollToBottom()
  }, [presentChat.messages])

  return (
    <div id="messages-container" className='messagebox'>
      {presentChat.messages.map((message) => (
        <div className={`msg ${user === message.username ? "right" : "left"}`} key={message.key}>
          <div className='logo'><img src={presentChat.profilePic} /></div>
          <div className='msgdetails'>
            {presentChat.type === "friends" ? <></> : <span className='msg-username'>{message.username} </span>}
            <div className={`msg-content ${message.typing ? "typing" : ""}`}>
            {message.image && <div className='msg-image'><img src={image_url(message.image)}/></div>}
            <span className={`msg-message ${user === message.username? "right-msg" : "left-msg"}`}>{message.message}</span>
            </div>
            <span className='timestamp'>{message.timestamp.date}<br/>{message.timestamp.time}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Messagebox
