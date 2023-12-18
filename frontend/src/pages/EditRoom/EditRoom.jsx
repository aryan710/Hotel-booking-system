import React, { useEffect, useState } from "react";
import styles from "./EditRoom.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import RoomsCard from "../../components/RoomsCard/RoomsCard";
import { CircularProgress } from "@mui/material";
const EditRoom = () => {
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const { hotelID } = useSelector((state) => state.auth.user);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/hotel/get-all-rooms/${hotelID}`,
          { withCredentials: true }
        );
        setRooms(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, [hotelID]);

  return (
    <div className={styles.wrapper}>
      <h2>All Rooms</h2>
      {loading ? (
        <div className={styles.innerWrapper} style={{display:"flex", alignItems: "center", justifyContent: "center", height: "60vh"}}>
          <CircularProgress />
          <h4>Loading...</h4>
        </div>
      ) : (
        <div className={styles.innerWrapper}>
          {rooms.map((room, index) => {
            return <RoomsCard room={room} hotelID={hotelID} key={index} />;
          })}
        </div>
      )}
    </div>
  );
};

export default EditRoom;
