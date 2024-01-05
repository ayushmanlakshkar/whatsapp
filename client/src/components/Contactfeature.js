import React from 'react'
import { Badge, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { setcollapsed } from '../store/slices/navbarslice';
import { friend_requests } from '../store/slices/friends_reqslice';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { setcontacts } from '../store/slices/contactslice'
import '../styles/contactfeature.css';


const Contactfeature = () => {
    const iscollapsed = useSelector(state => state.navbar.status)
    const friend_req_options = useSelector(state => state.friend_req)
    const friend_req_numbers = useSelector(state => state.user.friend_requests)
    const username = useSelector(state => state.user.username)
    const dispatch = useDispatch()

    const closenavbar = () => {
        dispatch(setcollapsed(true));
        dispatch(friend_requests("friends"))
    }

    const set_feature = (e) => {
        dispatch(setcontacts({friends:[],groups:[]}))
        dispatch(friend_requests(e))
    }



    return (
        <div className='contactfeaturebar'>
            <div className='hello'>
                <img className='userlogo' src='https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg' />
                <div className='client-username'>{username}</div>
            </div>
            <div className='add-options'>
                <div>
                    <IconButton  onClick={() => { set_feature("friends") }}>
                        <ArrowBackIcon className={`add ${friend_req_options.friends?"choosed":""}`} />
                    </IconButton>
                </div>
                <div>

                    <IconButton onClick={() => { set_feature("add_friend") }}>
                        <PersonAddAlt1Icon className={`add ${friend_req_options.add_friend?"choosed":""}` } />
                    </IconButton>
                </div>
                <div>

                    <IconButton onClick={() => { set_feature("add_group") }}>
                        <GroupAddIcon className={`add ${friend_req_options.add_group?"choosed":""}` } />
                    </IconButton>
                </div>
                <div>
                    <IconButton onClick={() => { set_feature("friend_req") }}>
                        <Badge className='friend-iconwrapper' badgeContent={friend_req_numbers.length} color="primary">
                            <PersonIcon className={`add ${friend_req_options.friend_req?"choosed":""}` } />
                        </Badge>
                    </IconButton>
                </div>
                <div>
                <IconButton onClick={() => { set_feature("create_group") }}>
                        <Badge>
                            <AddBoxIcon className={`add ${friend_req_options.create_group?"choosed":""}` }/>
                        </Badge>
                    </IconButton>
                </div>
                {!iscollapsed ?
                    <div className='exit-navbar'>
                        <IconButton className='exit-navbar' onClick={closenavbar}>
                            <Badge className='exit-navbar' color="primary">
                                <CloseIcon className='add' />
                            </Badge>
                        </IconButton>
                    </div>
                    : ""}
            </div>

        </div>
    )
}

export default Contactfeature
