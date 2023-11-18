import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotelId: '',
  hotelName: '',
  roomType: '',
  checkIn: '',
  checkOut: '',
  guests: '',
  price: '',
};

export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers:{
        setBookingDetails: (state, action)=>{
            state.roomType = action.payload.roomType;
            state.hotelName = action.payload.hotelName;
            state.hotelId = action.payload.hotelID;
            state.checkIn = action.payload.checkIn;
            state.checkOut = action.payload.checkOut;
            state.guests = action.payload.guests;
            state.price = action.payload.price;
        }
    }
})

export const {setBookingDetails} = bookingSlice.actions;
export default bookingSlice.reducer