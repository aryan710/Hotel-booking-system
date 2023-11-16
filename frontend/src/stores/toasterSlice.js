import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  message: '',
  error: false,
  success: false,
};

export const toasterSlice = createSlice({
    name: 'toaster',
    initialState,
    reducers:{
        openToaster: (state, action)=>{
            state.open = true;
            state.message = action.payload.message;
            state.error = action.payload.error;
            state.success = action.payload.success;
        },
        closeToaster: (state,action)=>{
            state.open = false;
        }
    }
})

export const {openToaster, closeToaster} = toasterSlice.actions;
export default toasterSlice.reducer