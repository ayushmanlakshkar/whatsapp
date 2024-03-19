import { createSlice } from '@reduxjs/toolkit';

const userslice = createSlice({
    name: 'user_details',
    initialState: {
        username :'',
        friend_requests:[],
        profile: ''
    },
    reducers:{
        setuser_details(state,action){
            console.log(action.payload)
            if(action.payload.username){
                state.username = action.payload.username
            }
            if(action.payload.friend_requests){
                state.friend_requests = [...action.payload.friend_requests]
            }
            if(action.payload.profile){
                state.profile = action.payload.profile
            }
        }
    }
})

export const {setuser_details}=userslice.actions
export default userslice.reducer