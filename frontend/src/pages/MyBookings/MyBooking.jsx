import React, { useEffect, useState } from "react";
import styles from "./MyBooking.module.css";
import BookingCard from "../../components/BookingCard/BookingCard";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { setAllBookings } from "../../stores/allBookingsSlice";
const MyBooking = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/my-bookings`,
          { withCredentials: true }
        );
        dispatch(setAllBookings(data.data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);

  const bookings = useSelector((state) => state.allBookings.bookings);

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.innerWrapper}>
          {bookings &&
            bookings.map((booking, index) => {
              return (
                <Link style={{textDecoration: 'none', color: "#000"}} key={index} to={`/my-booking/${booking._id}`}>
                  <BookingCard booking={booking}/>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default MyBooking;
