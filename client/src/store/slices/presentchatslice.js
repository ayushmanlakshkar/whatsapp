
import { createSlice } from "@reduxjs/toolkit";

const presentchatslice = createSlice({
    name:"presentchat",
    initialState:{
        chatname:"",
        profilePic:"",
        type:"",
        messages:[]
    },
    reducers:{
        setChatname(state,action){
            state.chatname = action.payload.chatname
            state.type = action.payload.type
            state.profilePic = action.payload.profilePic
        },
        setMessages(state,action){
            state.messages=[...action.payload]
        },
        appendMessages(state,action){
            state.messages.push(action.payload)
        },
        removeMessage(state, action) {
            state.messages = state.messages.filter((message) => message.key !== action.payload);
          }
          
    }
})

export const {setChatname,setMessages,appendMessages,removeMessage}=presentchatslice.actions
export default presentchatslice.reducer