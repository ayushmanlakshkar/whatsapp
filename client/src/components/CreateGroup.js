import React, { useState } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
import { friend_requests } from '../store/slices/friends_reqslice';
import { useSelector, useDispatch } from 'react-redux';

import '../styles/creategroup.css'

const CreateGroup = () => {
    const dispatch = useDispatch()
    const [groupname, setGroupname] = useState("")
    const [error, setError] = useState("")
    const create_group = async () => {
        await axios.post('http://localhost:3001/contact/create_group', { username: "user1", groupname: groupname }).then((response) => {
            if (response.data.error) {
                setError(response.data.error)
                setTimeout(() => {
                    setError("")
                }, 3000);
            } else {
                dispatch(friend_requests("friends"))
            }
        })
    }
    return (
        <div className='create-group-container'>
            <input className='create-group-input' value={groupname} onChange={(e) => setGroupname(e.target.value)} />
            <Button variant="contained" color="success" onClick={create_group}>
                Create Group
            </Button>
            <div>{error}</div>
        </div>
    )
}

export default CreateGroup
