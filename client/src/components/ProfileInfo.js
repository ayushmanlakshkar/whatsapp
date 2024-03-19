import React,{useEffect} from 'react'
import LogoUrl from '../services/Api'
import { useSelector } from 'react-redux'
import '../styles/profileinfo.css'
function ProfileInfo() {
    const User = useSelector(state=>state.user)
    console.log(User)
   
  return (
    <div className='profile-info-panel'>
        <div className='profilePicture' ><img src={User.profile?LogoUrl(User.profile):LogoUrl("public/profilePictures/logo.png")}/></div>
      
    <div className='username'>{User.username}</div>
    </div>
  )
}

export default ProfileInfo
