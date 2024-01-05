import React from 'react'
import Contactfeature from './Contactfeature'
import Contactscroll from './Contactscroll'
import { useSelector } from 'react-redux';
import '../styles/leftsidebar.css'



const Leftsidebar = () => {
  const iscollapsed = useSelector(state => state.navbar.status)
  return (
    <div className={`leftsidebar ${iscollapsed?"collapse":''}`}>
      <Contactfeature/>
      <Contactscroll/>
    </div>
  )
}

export default Leftsidebar
