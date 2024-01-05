import { createSlice } from '@reduxjs/toolkit';

const isTypingslice = createSlice({
    name: 'isTyping',
    initialState: {
        status: false
    },
    reducers:{
        setTyping(state,action){
            state.status = !state.status;
        }
    }
})

export const {setTyping}=isTypingslice.actions
export default isTypingslice.reducer