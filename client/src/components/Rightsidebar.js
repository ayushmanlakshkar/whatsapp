import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import Chatscroll from './Chatscroll'
import Chatfeature from './Chatfeature'
import '../styles/rightsidebar.css'

const Rightsidebar = () => {
  const iscollapsed = useSelector(state=>state.navbar.status)
  
  return (
    <div className={`rightsidebar ${iscollapsed?"":"chat-collapse"}`}>
      <Chatfeature/>
      <Chatscroll/>
    </div>
  )
}

export default Rightsidebar
