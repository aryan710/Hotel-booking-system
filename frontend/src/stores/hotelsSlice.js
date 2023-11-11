import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
  hotels_loading: false,
  hotels_error: false,
  hotels: [],
  single_hotel_loading: false,
  single_hotel_error: false,
  single_hotel:{},
};

export const hotelsSlice = createSlice({
    name: 'hotels',
    initialState,
    reducers:{
        openSidebar: (state, action)=>{
            state.isSidebarOpen = true;
        },
        closeSidebar: (state,action)=>{
            state.isSidebarOpen = false;
        }
    }
})

export const {openSidebar, closeSidebar} = hotelsSlice.actions;
export default hotelsSlice.reducer