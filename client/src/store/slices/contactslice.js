import { createSlice } from '@reduxjs/toolkit';

const contactslice = createSlice({
    name: 'contacts',
    initialState: {friends:[],groups:[]},
    reducers:{
        setcontacts(state,action){
            if(action.payload.friends){
                state.friends=[...action.payload.friends]
            }
            if(action.payload.groups){
                state.groups=[...action.payload.groups]
            }
        }

    }
})

export const { setcontacts }= contactslice.actions
export default contactslice.reducer