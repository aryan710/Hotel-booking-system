import React, { useState } from "react";
import styles from "./AddressDetails.module.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openToaster } from "../../../stores/toasterSlice";
import { setAddressDetails } from "../../../stores/hotelsSlice";
import { useNavigate } from "react-router-dom";
import { createHotelApi } from "../../../http";
import { setActivate } from "../../../stores/authSlice";
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry",
];

const AddressDetails = () => {
  const hotels = useSelector((state) => state.hotels);
  const [address, setAddress] = useState(hotels.address);
  const [city, setCity] = useState(hotels.city);
  const [state, setState] = useState(hotels.state);
  const [pincode, setPincode] = useState(hotels.pincode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleActivation = async () => {
    try {
      const { data } = await createHotelApi({
        ...hotels,
        address,
        city,
        state,
        pincode,
      });
      dispatch(
        openToaster({
          message: data.message,
          error: false,
          success: true,
        })
      );
      dispatch(setActivate());
      navigate("/add-room");
    } catch (error) {
      dispatch(
        openToaster({
          message: error.message,
          error: true,
          success: false,
        })
      );
    }
  };

  const handleSubmit = () => {
    if (!address || !city || !state || !pincode) {
      return dispatch(
        openToaster({
          message: "All fields are mendatory",
          error: true,
          success: false,
        })
      );
    }
    const data = {
      address,
      state,
      city,
      pincode,
    };
    dispatch(setAddressDetails(data));
    handleActivation();
  };
  return (
    <div className={styles.addressDetailsContainer}>
      <h2>Address details</h2>
      <div className={styles.innerContainer}>
        <TextField
          className={styles.input}
          id="standard-basic"
          label="Address"
          variant="standard"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          className={styles.input}
          id="standard-basic"
          label="city"
          variant="standard"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div className={styles.selectInputs}>
          <FormControl sx={{ m: 1, minWidth: 120, width: 200 }}>
            <InputLabel id="demo-simple-select-helper-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={state}
              label="State"
              onChange={(e) => setState(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {indianStates.map((state) => (
                <MenuItem value={state} key={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
            {/* <FormHelperText>With label + helper text</FormHelperText> */}
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120, width: 200 }}>
            <TextField
              id="standard-basic"
              label="Pincode"
              variant="standard"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
            {/* <FormHelperText>With label + helper text</FormHelperText> */}
          </FormControl>
        </div>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddressDetails;
