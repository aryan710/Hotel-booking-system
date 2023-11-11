import { configureStore } from '@reduxjs/toolkit';
import hotels from './hotelsSlice'
export const store = configureStore({ 
    reducer:{
        hotels
    }
})