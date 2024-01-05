import { createSlice } from '@reduxjs/toolkit';

const chatslice = createSlice({
    name: 'chat',
    initialState: {
        name :'bum'
    },
    reducers:{
        setchat(state,action){
            state.name = action.payload
        }
    }
})

export const {setchat}=chatslice.actions
export default chatslice.reducer