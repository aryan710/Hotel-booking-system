import React, { useEffect, useState } from "react";
import styles from "./PayNow.module.css";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openToaster } from "../../../stores/toasterSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useSingleHotels } from "../../../hooks/useSingleHotel";
import axios from "axios";
import { createOrderApi, getKeyApi } from "../../../http";
const PayNow = ({ nextStep }) => {
  const dispatch = useDispatch();
  const book = useSelector((state) => state.booking);
  const { id } = useParams();
  const hotel = useSelector((state) => state.allhotels.singleHotel);

  const navigate = useNavigate();
  useEffect(() => {
    if (!hotel.rooms) {
      navigate("/hotels");
    }
  }, []);

  const handlePayment = async () => {
    try {
      // get key
      const {
        data: { key },
      } = await getKeyApi();

      const dataToSend = {
        checkIn: book.checkIn,
        checkOut: book.checkOut,
        amount: book.price,
        roomType: book.roomType,
      };
      // create order and validate amount
      const {
        data: { order },
      } = await createOrderApi(dataToSend, hotel._id);

      //   popup razor pay
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Hotel.in",
        description: "Make safe payments using Razor pay !!!",
        image: "",
        order_id: order.id,
        callback_url: "http://localhost:7700/api/paymentverification",
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#2478FF",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
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

  return (
    <section className={styles.bookingForm}>
      <div className={styles.heading}>
        <h2>{hotel.name}</h2>
      </div>
      <div>
        <h5>Guests : {book.guests}</h5>
        <h5>Room Type : {book.roomType}</h5>
        <h5>Check-In Date : {book.checkIn}</h5>
        <h5>Check-Out Date : {book.checkOut}</h5>
        <h5>Total price : ₹{book.price}</h5>
      </div>
      <Button
        variant="contained"
        className={styles.btn}
        onClick={handlePayment}
      >
        Pay amount
      </Button>
    </section>
  );
};

export default PayNow;
