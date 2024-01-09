import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/contacts.css';
import { socket } from '../socket-connection/socket';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import { setChatname } from '../store/slices/presentchatslice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setToastMessage } from '../store/slices/toastSlice';
import { BASE_URL } from '../services/Api';


const Contacts = () => {
  const reading = useSelector((state) => state.reading);
  const user = useSelector((state) => state.user.username);
  const contacts = useSelector((state) => state.contacts);
  const friend_req_options = useSelector((state) => state.friend_req);
  const presentChatname = useSelector((state) => state.presentchat.chatname);

  const dispatch = useDispatch();

  const set_key = () => {
    if (friend_req_options.friends) {
      if (reading.personal) {
        return { key: 'friends', message: 'Add friend to chat' };
      } else {
        return { key: 'groups', message: 'Join groups to chat' };
      }
    } else if (friend_req_options.friend_req) {
      return { key: 'friends', message: 'No friend requests yet' };
    } else if (friend_req_options.add_friend) {
      return { key: 'friends', message: 'Search for username' };
    } else if (friend_req_options.add_group) {
      return { key: 'groups', message: 'Search for groupname' };
    }
  };

  let { key, message } = set_key();
  let [temporary_contacts, setTemporary_contacts] = useState([])


  const send_friendrequest = async (contactname) => {
    await axios.post(`${BASE_URL}contact/send_friendrequest`, { sender: user, reciever: contactname }).then((response) => {
      socket.emit('send_friend_request', { sender: user, reciever: contactname });
      dispatch(setToastMessage({message: response.data,type:true}))
    }).catch((error) => {
      dispatch(setToastMessage({message:error.response.data,type:false}))
    })
  };

  const accept_friend_request = async (contactname) => {
    await axios.post(`${BASE_URL}contact/accept_friend`, { username: user, friend: contactname }).then((response) => {
      socket.emit('accept_reject_friend', { username: user, friend: contactname, acceptance: true });
      dispatch(setToastMessage({message: response.data,type:true}))
    }).catch((error) => {
      dispatch(setToastMessage({message:error.resposne.data,type:false}))
    })
  };

  const reject_friend_request = async (contactname) => {
    await axios.post(`${BASE_URL}contact/reject_friend`, { username: user, friend_request: contactname }).then((response) => {
      socket.emit('accept_reject_friend', { username: user, friend: contactname, acceptance: false });
      dispatch(setToastMessage({message: response.data,type:true}))
    }).catch((error) => {
      dispatch(setToastMessage({message:error.resposne.data,type:false}))
    })
  };

  const join_group = async (contactname) => {
    await axios.post(`${BASE_URL}contact/add_group`, { username: user, groupname: contactname }).then((response) => {
      dispatch(setToastMessage({message: response.data,type:true}))
    }).catch((error) => {
      dispatch(setToastMessage({message:error.response.data,type:false}))
    })
  }

const logo_url = (url)=>{
   const logoURL= BASE_URL+ url.substring(7)
   console.log(logoURL)
    return logoURL
}


  useEffect(() => {
    socket.on("user_online", (data) => {
      setTemporary_contacts((prevContacts) => {
        return prevContacts.map((contact) =>
          contact.name === data.user
            ? { ...contact, isOnline: true }
            : contact
        );
      });
    });

    socket.on("user_offline", (data) => {
      setTemporary_contacts((prevContacts) => {
        return prevContacts.map((contact) =>
          contact.name === data.user
            ? { ...contact, isOnline: false }
            : contact
        );
      });
    })

    return () => {
      socket.off("user_online");
      socket.off("user_offline");
    };

  }, [])

  useEffect(() => {
    setTemporary_contacts(contacts[key])
  }, [key, contacts])

  return (
    <div className='contact-list'>
      {temporary_contacts.length > 0 ? (
        temporary_contacts.map((contact) => (
          <div className={`contact ${presentChatname == contact.name ? 'chatting' : ''}`} key={contact.name} onClick={() => { { friend_req_options.friends ? dispatch(setChatname({ chatname: contact.name, type: key ,profilePic:logo_url(contact.profile)})) : <></> } }}>
            <div className='contact-logo'><img src={logo_url(contact.profile)} /></div>
            <span className='contact-name'>{contact.name}</span>
            {contact.isOnline && <span className='online-container'> <span className='online-icon'></span><span>online</span> </span>}
            {friend_req_options.add_friend ?
              <span className='accept_reject'>
                <Button variant="contained" color="success" onClick={() => send_friendrequest(contact.name)}>
                  <AddIcon />
                </Button>
              </span>
              : <></>}
            {friend_req_options.add_group ?
              <span className='accept_reject'>
                <Button variant="contained" color="success" onClick={() => join_group(contact.name)}>
                  JOIN
                </Button></span>
              : <></>}
            {friend_req_options.friend_req ?
              <span className='accept_reject'>
                <IconButton color='success' onClick={() => accept_friend_request(contact.name)}>
                  <DoneIcon />
                </IconButton>
                <IconButton color='error' onClick={() => reject_friend_request(contact.name)}>
                  <ClearIcon />
                </IconButton>
              </span>
              : <></>}
          </div>
        ))
      ) : (
        <div className='contact_list_empty'>{message}</div>
      )}
    </div>
  );
};

export default Contacts;
