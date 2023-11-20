import { configureStore } from '@reduxjs/toolkit';
import hotels from './hotelsSlice'
import toaster from './toasterSlice'
import auth from './authSlice'
import allhotels from './allHotelsSlice'
import booking from './bookingSlice'
import allBookings from './allBookingsSlice';
export const store = configureStore({ 
    reducer:{
        hotels,
        toaster,
        auth,
        allhotels,
        booking,
        allBookings
    }
})