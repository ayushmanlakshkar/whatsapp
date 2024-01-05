import React, { useEffect } from 'react'
import axios from 'axios'
import { socket } from '../socket-connection/socket'
import { useSelector, useDispatch } from 'react-redux'
import { appendMessages, setMessages } from '../store/slices/presentchatslice'
import '../styles/messagebox.css'
import logo from '../img/logo.png'

const Messagebox = () => {
  const user = useSelector(state => state.user.username)
  const presentChat = useSelector(state => state.presentchat)
  const navbar_collapsed = useSelector(state => state.navbar.status)
  const dispatch = useDispatch()

  const get_messages = async () => {
    await axios.post('http://localhost:3001/chats/get_messages', { type: presentChat.type, chatname: presentChat.chatname, username: user }).then((response) => {
      dispatch(setMessages(response.data));
    })
  }

  const scrollToBottom = () => {
    const messagesContainer = document.getElementById('messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  };

  useEffect(() => {
    socket.on("send_message", (data) => {
      dispatch(appendMessages({ username: data.username, key: data.key, message: data.message, timestamp: data.timestamp }));
    });
    get_messages();
    return () => {
      socket.off("send_message")
    }
  }, [presentChat.type, presentChat.chatname])


  useEffect(() => {
    if(navbar_collapsed){
      scrollToBottom();
    }
  }, [navbar_collapsed])
  
  useEffect(() => {
    scrollToBottom()
  },[presentChat.messages])
  return (
    <div id="messages-container" className='messagebox'>
      {presentChat.messages.map((message) => (
        <div className={`msg ${user === message.username ? "right" : "left"}`} key={message.key}>
          <div className='logo'><img src={logo} /></div>
          <div className='msgdetails'>
            {presentChat.type === "friends" ? <></> : <span className='msg-username'>{message.username} </span>}
            <div className={`msg-content ${message.typing?"typing":""}`}>
              {message.message}
            </div>
            <span className='timestamp'>{message.timestamp}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Messagebox
