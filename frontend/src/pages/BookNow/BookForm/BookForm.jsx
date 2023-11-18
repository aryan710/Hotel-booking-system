import React, { useEffect, useState } from "react";
import styles from "./BookForm.module.css";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openToaster } from "../../../stores/toasterSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useSingleHotels } from "../../../hooks/useSingleHotel";
import { setBookingDetails } from "../../../stores/bookingSlice";
const BookForm = ({ nextStep }) => {
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [roomType, setRoomType] = useState("");
  const [guests, setGuests] = useState(1);
  const dispatch = useDispatch();

  const { id } = useParams();
  const hotel = useSelector((state) => state.allhotels.singleHotel);
  const checkAvailability = () => {
    if (!checkin || !checkout || !roomType || !guests) {
      return dispatch(
        openToaster({
          message: "All fields are mendatory",
          error: true,
          success: false,
        })
      );
    }
    const date1 = new Date(checkin);
    const date2 = new Date(checkout);
    const difference = date2.getTime() - date1.getTime();
    const differenceInDays = difference / (1000 * 3600 * 24);
    let pricePerday;
    for (const room of hotel.rooms) {
      if (room.room_type === roomType) {
        pricePerday = room.price_per_nigh;
      }
    }

    if (!pricePerday) {
      return dispatch(
        openToaster({
          message: "Room Type is not available",
          error: true,
          success: false,
        })
      );
    }
    const netPrice = pricePerday * differenceInDays;
    const data = {
      hotelId: id,
      hotelName: hotel.name,
      roomType,
      checkIn: checkin,
      checkOut: checkout,
      guests: guests,
      price: netPrice,
    };

    dispatch(setBookingDetails(data));
    nextStep();
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!hotel.rooms) {
      navigate("/hotels");
    }
  }, []);
  return (
    <section className={styles.bookingForm}>
      <h2>{hotel.name}</h2>

      <form action="#" method="POST">
        <p>Room Type</p>
        <select
          id="room-type"
          name="room-type"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
        >
          <option value={''}>None</option>
          {hotel.rooms &&
            hotel.rooms.map((room, index) => {
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

export default BookForm;
