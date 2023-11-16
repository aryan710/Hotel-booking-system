import { configureStore } from '@reduxjs/toolkit';
import hotels from './hotelsSlice'
import toaster from './toasterSlice'
export const store = configureStore({ 
    reducer:{
        hotels,
        toaster
    }
})