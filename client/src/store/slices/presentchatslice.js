import { createSlice } from "@reduxjs/toolkit";

const presentchatslice = createSlice({
    name:"presentchat",
    initialState:{
        chatname:"",
        type:"",
        messages:[]
    },
    reducers:{
        setChatname(state,action){
            state.chatname = action.payload.chatname
            state.type = action.payload.type
        },
        setMessages(state,action){
            state.messages=[...action.payload]
        },
        appendMessages(state,action){
            state.messages.push(action.payload)
        },
        removeMessage(state,action){
            state.messages.pop()
        }
    }
})

export const {setChatname,setMessages,appendMessages,removeMessage}=presentchatslice.actions
export default presentchatslice.reducer