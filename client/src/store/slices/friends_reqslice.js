import { createSlice } from '@reduxjs/toolkit';

const friend_reqslice = createSlice({
    name: 'friend_request',
    initialState: {
       friends:true,
       friend_req:false,
       add_friend:false,
       add_group:false,
       create_group:false

    },
    reducers:{
        friend_requests(state,action){
            const keyToSetTrue = action.payload;
            Object.keys(state).forEach((key) => {
                state[key] = false;
            });

            state[keyToSetTrue] = true;
        }
    }
})

export const {friend_requests}=friend_reqslice.actions
export default friend_reqslice.reducer