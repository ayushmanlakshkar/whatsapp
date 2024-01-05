import React,{useEffect} from 'react'
import Leftsidebar from './Leftsidebar'
import Rightsidebar from './Rightsidebar'
import '../styles/chats.css'
import { Button } from '@mui/material'
import { setstatus } from '../store/slices/isloggedslice'
import { setcollapsed } from '../store/slices/navbarslice'
import { useDispatch } from 'react-redux'

const Chats = () => {
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
    })

  return (
    <div className='chatpage'>
       <Leftsidebar/>
       <Rightsidebar/>
    </div>
  )
}

export default Chats
