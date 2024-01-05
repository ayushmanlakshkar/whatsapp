import React from 'react'
import { useSelector } from 'react-redux'
import '../styles/chatscroll.css'
import Messagebar from './Messagebar'
import Messagebox from './Messagebox'

const Chatscroll = () => {
  const presentChat= useSelector(state=>state.presentchat.chatname)
  return (
    <div className={`chatscroll ${presentChat?<></>:"backgroundfirst"}`}>
      {presentChat?<><Messagebox/>
     <Messagebar/></>:<></>}
    </div>
  )
}

export default Chatscroll
