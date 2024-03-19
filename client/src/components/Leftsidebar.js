import React from 'react'
import { useSelector } from 'react-redux';
import '../styles/leftsidebar.css'
import ProfileInfo from './ProfileInfo';
import Contactside from './Contactside';



const Leftsidebar = () => {
  const iscollapsed = useSelector(state => state.navbar.status)
  return (
    <div className={`leftsidebar ${iscollapsed?"collapse":''}`}>
      <Contactside/>
      {/* <ProfileInfo/> */}
    </div>
  )
}

export default Leftsidebar
