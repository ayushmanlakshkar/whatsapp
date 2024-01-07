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
        },
        RemoveOneChat(state,action){
            if(action.payload.type=="friends"){
                state.friends = state.friends.filter(chat => chat.name !== action.payload.name);
            }else{
                state.groups = state.groups.filter(chat => chat.name !== action.payload.name);
            }
        }

    }
})

export const { setcontacts,RemoveOneChat }= contactslice.actions
export default contactslice.reducer