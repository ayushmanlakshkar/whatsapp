import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'

function Check() {
    const name=useSelector(state=>state.chat.name)
    const [address,setAddress]=useState('')
    console.log(name)
    const set_Address=()=>{
        setAddress(name.substring(7))
    }
    console.log(address)
    useEffect(()=>{
        set_Address()
    })
  return (
    <div>
      <img src={`http://localhost:3001/${address}`} alt='logo'/>
    </div>
  )
}

export default Check
