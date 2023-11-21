import React, { useState } from "react";
import styles from "./ContactDetails.module.css";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openToaster } from "../../../stores/toasterSlice";
import { setContactDetails } from "../../../stores/hotelsSlice";
const ContactDetails = ({ nextStep }) => {
  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.hotels);
  const [name, setName] = useState(hotels.name);
  const [email, setEmail] = useState(hotels.email);
  const [contactNumber, setContactNumber] = useState(hotels.contact_number);
  const handleNext = () => {
    if (!name || !email || !contactNumber) {
      return dispatch(
        openToaster({
          message: "All fields are mendatory",
          error: true,
          success: false,
        })
      );
    }
    const data = {
      name,
      email,
      contact_number: contactNumber,
    };
    dispatch(setContactDetails(data));
    nextStep();
  };
  return (
    <div className={styles.contactDetailsContainer}>
      <h2>Contact details</h2>
      <div className={styles.innerContainer}>
        <TextField
          className={styles.input}
          id="name"
          label="Hotel Name"
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          className={styles.input}
          id="standard-basic"
          label="Email"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className={styles.input}
          id="standard-basic"
          label="Contact Number"
          variant="standard"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />
        <Button variant="contained" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ContactDetails;
