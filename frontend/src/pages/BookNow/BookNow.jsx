import React, { useState } from "react";
import styles from "./BookNow.module.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openToaster } from "../../stores/toasterSlice";
const BookNow = () => {
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [roomType, setRoomType] = useState("");
  const [guests, setGuests] = useState(1);
  const dispatch = useDispatch();

  const checkAvailability = () => {
    if (!checkin || !checkout || !roomType || !guests) {
      dispatch(
        openToaster({
          message: "All fields are mendatory",
          error: true,
          success: false,
        })
      );
    }
  };

  const { id } = useParams();
  const hotel = useSelector((state) => state.allhotels.singleHotel);
  return (
    <section className={styles.bookingForm}>
      <h2>{hotel.name}</h2>

      <form action="#" method="POST">
        <p>Room Type</p>
        <select
          id="room-type"
          name="room-type"
          onChange={(e) => setRoomType(e.target.value)}
        >
          {hotel.rooms.map((room, index) => {
            return (
              <option value={room.room_type} key={index}>
                {room.room_type}
              </option>
            );
          })}
        </select>
        <label for="check-in">Check-In Date:</label>
        <input
          type="date"
          id="check-in"
          name="check-in"
          value={checkin}
          onChange={(e) => setCheckin(e.target.value)}
          required
        />

        <label for="check-out">Check-Out Date:</label>
        <input
          type="date"
          id="check-out"
          name="check-out"
          required
          value={checkout}
          onChange={(e) => setCheckout(e.target.value)}
        />

        <label for="guests">Number of Guests:</label>
        <input
          type="number"
          id="guests"
          name="guests"
          min="1"
          required
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />

        <Button variant="contained" onClick={checkAvailability}>
          Book Now
        </Button>
      </form>
    </section>
  );
};

export default BookNow;
