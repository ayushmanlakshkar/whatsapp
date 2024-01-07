import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userslice';
import isloggedreducer from './slices/isloggedslice';
import contactsreducer from './slices/contactslice';
import chatreducer from './slices/chatslice';
import friend_reqreducer from './slices/friends_reqslice'
import navbarslicereducer from './slices/navbarslice';
import readingslicereducer from './slices/reading';
import presentchatreducer from './slices/presentchatslice';
import isTypingreducer from './slices/isTyping';
import toastReducer from './slices/toastSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    islogged : isloggedreducer,
    contacts : contactsreducer,
    chat: chatreducer,
    friend_req :friend_reqreducer,
    navbar : navbarslicereducer,
    reading : readingslicereducer,
    presentchat: presentchatreducer,
    isTyping:isTypingreducer,
    toast: toastReducer
  },
});

export default store;
