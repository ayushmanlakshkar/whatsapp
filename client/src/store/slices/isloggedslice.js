import { createSlice } from '@reduxjs/toolkit';

const isloggedslice = createSlice({
    name: 'islogged',
    initialState: {
        status: false
    },
    reducers:{
        setstatus(state,action){
            state.status = action.payload
        }
    }
})

export const {setstatus}=isloggedslice.actions
export default isloggedslice.reducer