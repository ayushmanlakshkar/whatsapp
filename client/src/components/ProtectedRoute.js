import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Unauthorized from './Unauthorized'
import { setstatus } from '../store/slices/isloggedslice'
import { setuser_details } from '../store/slices/userslice'
import { setToastMessage } from '../store/slices/toastSlice'
import { socket } from '../socket-connection/socket'
import { BASE_URL } from '../services/Api'

function ProtectedRoute({ Component }) {
    const isLogged = useSelector(state => state.islogged.status)
    const [isLoading, setisLoading] = useState(true)
    const dispatch = useDispatch()
    const { username } = useParams();

    const checkToken = async (token) => {
        const headers = {
            Authorization: 'Bearer ' + token
        }
        await axios.post(`${BASE_URL}auth/token_login`, { username, headers }).then((response) => {
            dispatch(setuser_details({ username }))
            dispatch(setstatus(true))
            socket.emit('user_login', { username })
            socket.emit("user_online", { username })
        }).catch((error) => {
            if (error.response.data.name === "TokenExpiredError") {
                dispatch(setToastMessage({ message: error.response.data.message, type: false }))
            } else {
                dispatch(setToastMessage({ message: error.response.data, type: false }))
            }
        })
        setisLoading(false);
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            checkToken(token)
        } else {
            dispatch(setstatus(false))
            setisLoading(false)
        }

    }, [])

    return isLoading ? <></> : (isLogged ? Component : <Unauthorized />)

}

export default ProtectedRoute
