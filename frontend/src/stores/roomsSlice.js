import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name:'',
  email:'',
  contact_number:'',
  address:'',
  pincode:'',
  state:'',
  city:'',
};

export const hotelsSlice = createSlice({
    name: 'hotels',
    initialState,
    reducers:{
        setContactDetails: (state, action)=>{
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.contact_number = action.payload.contact_number;
        },
        setAddressDetails: (state,action)=>{
            state.address = action.payload.address;
            state.pincode = action.payload.pincode;
            state.state = action.payload.state;
            state.city = action.payload.city;
        }
    }
})

export const {setContactDetails, setAddressDetails} = hotelsSlice.actions;
export default hotelsSlice.reducer