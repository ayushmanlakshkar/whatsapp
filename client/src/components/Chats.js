import React,{useEffect} from 'react'
import Leftsidebar from './Leftsidebar'
import Rightsidebar from './Rightsidebar'
import '../styles/chats.css'
import { Button } from '@mui/material'
import { setstatus } from '../store/slices/isloggedslice'
import { setcollapsed } from '../store/slices/navbarslice'
import { useDispatch, useSelector } from 'react-redux'
import { socket } from '../socket-connection/socket'
import { setuser_details } from '../store/slices/userslice'

const Chats = () => {
  const username = useSelector(state=>state.user.username)
    const dispatch = useDispatch()

    const windowsizing =()=>{
      if (window.innerWidth <= 800) {
        dispatch(setcollapsed(true))
    } else {
        dispatch(setcollapsed(false))
    }
    }
  
    useEffect(()=>{
      window.addEventListener('resize',windowsizing)
      window.addEventListener('popstate',()=>{
        socket.emit("user_logout",{username})
        localStorage.removeItem('token')
        dispatch(setuser_details({ username: "" }))
        dispatch(setstatus(false))
      })
    

    },[])

  return (
    <div className='chatpage'>
       <Leftsidebar/>
       <Rightsidebar/>
    </div>
  )
}

export default Chats
