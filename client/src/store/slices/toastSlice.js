import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  type:true
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToastMessage: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type
    },
    clearToastMessage: (state) => {
      state.message = '';
    },
  },
});

export const { setToastMessage, clearToastMessage } = toastSlice.actions;
export default toastSlice.reducer;