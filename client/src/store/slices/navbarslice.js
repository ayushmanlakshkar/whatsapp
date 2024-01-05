import { createSlice } from '@reduxjs/toolkit';

const iscollapsedslice = createSlice({
    name: 'iscollapsed',
    initialState: {
        status: false
    },
    reducers:{
        setcollapsed(state,action){
            state.status = action.payload;
        }
    }
})

export const {setcollapsed}= iscollapsedslice.actions
export default iscollapsedslice.reducer