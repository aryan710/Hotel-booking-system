import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotels: [],
  singleHotel: {},
  hotelId: '',
};

export const allHotelsSlice = createSlice({
    name: 'allhotels',
    initialState,
    reducers:{
        setAllHotels: (state, action)=>{
            state.hotels = action.payload;
        },
        setHotelID:(state,action)=>{
            state.hotelId = action.payload;
        },
        setSingleHotel: (state,action)=>{
            state.singleHotel = action.payload;
        }
    }
})

export const {setAllHotels, setHotelID, setSingleHotel} = allHotelsSlice.actions;
export default allHotelsSlice.reducer