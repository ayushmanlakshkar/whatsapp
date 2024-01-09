import React, { useState } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
import { friend_requests } from '../store/slices/friends_reqslice';
import { useSelector, useDispatch } from 'react-redux';
import { setToastMessage } from '../store/slices/toastSlice';
import { BASE_URL } from '../services/Api';
import '../styles/creategroup.css'

const CreateGroup = () => {
    const dispatch = useDispatch()
    const [groupname, setGroupname] = useState("")
    const [profile, setProfile] = useState(null)
    const [error, setError] = useState("")
    const user = useSelector(state => state.user.username)

    const create_group = async () => {
        const formData = new FormData()
        formData.append('username', user)
        formData.append('groupname', groupname)
        formData.append('profile', profile)

        await axios.post(`${BASE_URL}contact/create_group`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            dispatch(setToastMessage({ message: response.data, type: true }))
            setProfile(null)
            setGroupname('')
        }).catch((error) => {
            dispatch(setToastMessage({ message: error.response.data, type: false }))
        })
    }
    return (
        <div className='create-group-container'>
            <div className='profile_group'>
                {profile && (
                    <img
                        src={URL.createObjectURL(profile)}
                        alt="Profile"
                        className='image_shower_group'
                    />
                )}
                <label className='profile_picture_group' htmlFor="profile-input-group">
                    Choose Group Profile
                    <input
                        type="file"
                        id="profile-input-group"
                        accept="image/*"
                        onChange={(e) => setProfile(e.target.files[0])}
                        style={{ display: 'none' }}
                    />
                </label>

            </div>
            <input className='create-group-input' value={groupname} placeholder='Group Name' onChange={(e) => setGroupname(e.target.value)} />
            <Button variant="contained" color="success" onClick={create_group}>
                Create Group
            </Button>
            <div>{error}</div>
        </div>
    )
}

export default CreateGroup
