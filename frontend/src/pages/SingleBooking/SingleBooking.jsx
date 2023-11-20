import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./SingleBooking.module.css";
import { format } from "date-fns";
import locationImage from "../../assets/images/location.png";
import callImage from "../../assets/images/contactNo.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setBooking, setStatus } from "../../stores/allBookingsSlice";
import Loader from "../Loader/Loader";
import { openToaster } from "../../stores/toasterSlice";
import { CircularProgress } from "@mui/material";

const SingleBooking = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isCanceling, setIsCanceling] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/my-booking/${id}`,
          { withCredentials: true }
        );
        dispatch(setBooking(data.data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);

  const booking = useSelector((state) => state.allBookings.booking);

  const handleCancelation = async () => {
    setIsCanceling(true);
    try {
      await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/cancel-booking/${id}`,
        { withCredentials: true }
      );
      dispatch(setStatus({ id }));
      setIsCanceling(false);
      openToaster({
        message: "Booking is canceled",
        error: true,
        success: false,
      });
    } catch (error) {
      setIsCanceling(false);
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
    <div className={styles.wrapper}>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.innerWrapper}>
          <div className={styles.container}>
            <div className={styles.top}>
              <div className={styles.left}>
                <img src={booking.roomUrl} alt="" />
              </div>
              <div className={styles.right}>
                <div className={styles.headingAndCancel}>
                  <h1>{booking.hotelName}</h1>
                  {isCanceling ? (
                    <CircularProgress
                      className={`${styles.loader}`}
                      style={{ color: "#000" }}
                    />
                  ) : (
                    booking.status === "confirmed" && (
                      <button
                        onClick={handleCancelation}
                        className={`${styles.status} ${styles.btn}`}
                      >
                        Cancel Booking
                      </button>
                    )
                  )}
                </div>
                <p className={styles.address}>
                  <img src={locationImage} alt="" />
                  {booking.hotelAddress}
                </p>
                <p className={styles.phone}>
                  <img src={callImage} alt="" />
                  {booking.hotelContactNumber}
                </p>
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.bookingID}>
                <h2>
                  Booking Id: <span>{booking._id}</span>
                </h2>
                <button
                  className={
                    booking.status === "confirmed"
                      ? `${styles.status} ${styles.confirmed}`
                      : booking.status === "canceled"
                      ? `${styles.status} ${styles.canceled}`
                      : `${styles.status} ${styles.pending}`
                  }
                >
                  {booking.status.charAt(0).toUpperCase() +
                    booking.status.slice(1)}
                </button>
              </div>
              <div className={styles.roomDetails}>
                <h4>
                  Room Type: <span>{booking.room_type}</span>
                </h4>
                <h4>
                  Check In Date:{" "}
                  <span>
                    {format(new Date(booking.checkInDate), "dd/MM/yyyy")}
                  </span>
                </h4>
                <h4>
                  Check Out Date:{" "}
                  <span>
                    {format(new Date(booking.checkOutDate), "dd/MM/yyyy")}
                  </span>
                </h4>
                <h4>
                  Paid Amount: <span>₹{booking.totalPrice}</span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleBooking;
