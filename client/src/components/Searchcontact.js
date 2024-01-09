import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from '@mui/material'
import { setcontacts } from '../store/slices/contactslice'
import { socket } from '../socket-connection/socket';
import { setuser_details } from '../store/slices/userslice';
import '../styles/searchcontact.css'
import { BASE_URL } from '../services/Api';


const Searchcontact = () => {
    // const [input ,setInput]=useState('')
    const user = useSelector((state) => state.user)
    const friend_req_options = useSelector(state => state.friend_req)
    const dispatch = useDispatch()
    const contacts = useSelector((state) => state.contacts)

    const contactsSet = async (input) => {
        if (friend_req_options.friends) {
            if (!input) {
                await axios.post(`${BASE_URL}contact/get_mycontacts`, { username: user.username }).then((response) => {
                    dispatch(setcontacts(response.data))
                })
            }
            else {
                const filtered_friends = contacts["friends"].filter(contact => contact.name.toLowerCase().startsWith(input.toLowerCase()));
                const filtered_groups = contacts["groups"].filter(contact => contact.name.toLowerCase().startsWith(input.toLowerCase()));
                dispatch(setcontacts({ friends: filtered_friends, groups: filtered_groups }));
            }
        }
        else if (friend_req_options.friend_req) {
            if (!input) {
                dispatch(setcontacts({ friends: user.friend_requests }))
            }
            else {
                const filtered = contacts["friends"].filter(contact => contact.name.toLowerCase().startsWith(input.toLowerCase()));
                dispatch(setcontacts({ friends: filtered }));
            }
        }
        else if (friend_req_options.add_friend) {
            await axios.post(`${BASE_URL}contact/get_users`, { characters: input }).then((response) => {
                dispatch(setcontacts({ friends: response.data }))
            })
        }
        else if (friend_req_options.add_group) {
            await axios.post(`${BASE_URL}contact/get_groups`, { characters: input }).then((response) => {
                dispatch(setcontacts({ groups: response.data }))
            })
        }
        
    }

    const set_contacts = (e) => {
        contactsSet(e.target.value)
    }

    const set_friendrequest = async () => {
        await axios.post(`${BASE_URL}contact/get_friend_requests`, { username: user.username }).then((response) => {
            dispatch(setuser_details({ friend_requests: response.data }))
        })
    }

    useEffect(() => {
        set_friendrequest()
        contactsSet()
        socket.on('refresh_friend_requests', (d) => {
            set_friendrequest()
        })

        socket.on("refresh_friends", () => {
            contactsSet()
        })
        return () => {
            socket.off('refresh_friend_requests');
        };
    }, [friend_req_options])

    useEffect(() => {
        if(friend_req_options.friend_req){
            contactsSet()
        }
    }, [user.friend_requests])

    return (
        <div className='searchcontact'>
            <div className='searchbox'>
                <i className="fa fa-search searchicon" />
                <input className='searchinput' onChange={set_contacts} />
            </div>

        </div>
    )
}

export default Searchcontact
