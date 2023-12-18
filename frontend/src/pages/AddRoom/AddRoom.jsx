import React, { useEffect, useState } from "react";
import styles from "./AddRoom.module.css";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openToaster } from "../../stores/toasterSlice";
import { addRoomApi } from "../../http";
const AddRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState(1000);
  const [available, setAvailable] = useState(10);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const hotelId = useSelector((state) => {
    if (state.auth.user) return state.auth.user.hotelID;
  });
  
  useEffect(() => {
    if (!hotelId) navigate("/");
  },[]);
  const handleSignup = async () => {
    setIsSubmiting(true);
    if (!name || !url || !price || !available) {
      dispatch(
        openToaster({
          message: "All fields are mendatory",
          error: true,
          success: false,
        })
      );
      setIsSubmiting(false);
    }

    try {
      const {data} = await addRoomApi(
        {
          roomTypeName: name,
          price,
          roomAvailable: available,
          url,
        },
        hotelId
      );
      dispatch(
        openToaster({
          message: "Room Added successfully",
          error: false,
          success: true,
        })
      );
      setIsSubmiting(false);
      navigate('/')
    } catch (error) {
      setIsSubmiting(false);
      dispatch(
        openToaster({
          message: error.response.data.message,
          error: true,
          success: false,
        })
      );
    }
  };
  return (
    <div className={styles.registerWrapper}>
      <h2>Add Room</h2>
      <div className={styles.registerInnerWrapper}>
        <TextField
          id="email"
          value={name}
          label="Name"
          variant="standard"
          onChange={(e) => setName(e.target.value)}
          sx={{ minWidth: 120, width: 400 }}
        />

        <TextField
          id="Password"
          label="image url"
          variant="standard"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{ minWidth: 120, width: 400 }}
        />
        <TextField
          id="Confirm-Password"
          label="Price"
          variant="standard"
          type="number"
          value={price}
          sx={{ minWidth: 120, width: 400 }}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          id="Confirm-Password"
          label="Abailable rooms"
          variant="standard"
          type="number"
          value={available}
          sx={{ minWidth: 120, width: 400 }}
          onChange={(e) => setAvailable(e.target.value)}
        />

        {!isSubmiting ? (
          <Button variant="contained" onClick={handleSignup}>
            Add Room
          </Button>
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
};

export default AddRoom;
