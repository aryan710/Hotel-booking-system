import React, { useEffect, useState } from "react";
import styles from "./EditRoom.module.css";
import BookingCard from "../../components/BookingCard/BookingCard";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import roomImage from "../../assets/images/hotel2.webp";
import { setAllBookings } from "../../stores/allBookingsSlice";
import RoomsCard from "../../components/RoomsCard/RoomsCard";
const EditRoom = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         const { data } = await axios.get(
  //           `${process.env.REACT_APP_API_URL}/api/user/my-bookings`,
  //           { withCredentials: true }
  //         );
  //         dispatch(setAllBookings(data.data));
  //         setLoading(false);
  //       } catch (error) {
  //         console.log(error);
  //         setLoading(false);
  //       }
  //     })();
  //   }, []);

  return (
    <div className={styles.wrapper}>
        <h2>All Rooms</h2>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.innerWrapper}>
          <RoomsCard/>
        </div>
      )}
    </div>
  );
};

export default EditRoom;
