import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 bookings:[],
 booking:{},   
};

export const allBookingSlice = createSlice({
    name: 'allBookings',
    initialState,
    reducers:{
        setAllBookings: (state, action)=>{
            state.bookings = action.payload;
        },
        setBooking:(state,action)=>{
            state.booking = action.payload;
        },
        setStatus:(state, action)=>{
            state.booking.status = 'canceled'
            const {id} = action.payload;
            const {bookings} = state;
            const filteredArray = bookings.filter(book => book._id !== id );
            const exactArray = bookings.filter(book => book._id === id );
            const [data] = exactArray;
            data.status = 'canceled'
            const newArray = [...filteredArray, data];
            state.bookings = newArray; 
        }
    }
})

export const {setAllBookings, setBooking, setStatus} = allBookingSlice.actions;
export default allBookingSlice.reducer