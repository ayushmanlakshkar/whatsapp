import { createSlice } from '@reduxjs/toolkit';

const readingslice = createSlice({
    name: 'reading',
    initialState: {
        personal: true,
        group:false
    },
    reducers:{
        setreading(state,action){
            const keyToSetTrue = action.payload;
            Object.keys(state).forEach((key) => {
                state[key] = false;
            });
            state[keyToSetTrue] = true;
        }
    }
})

export const {setreading}=readingslice.actions
export default readingslice.reducer