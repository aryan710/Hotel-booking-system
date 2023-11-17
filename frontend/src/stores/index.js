import { configureStore } from '@reduxjs/toolkit';
import hotels from './hotelsSlice'
import toaster from './toasterSlice'
import auth from './authSlice'
import allhotels from './allHotelsSlice'
export const store = configureStore({ 
    reducer:{
        hotels,
        toaster,
        auth,
        allhotels
    }
})