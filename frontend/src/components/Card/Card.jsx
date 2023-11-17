import React from "react";
import styles from "./Card.module.css";
import hotelImage from "../../assets/images/hotel1.webp";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setHotelID } from "../../stores/allHotelsSlice";
const Card = ({ hotel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = () =>{
    dispatch(setHotelID(hotel._id));
    navigate(`/singlehotel/${hotel._id}`)
  }
  return (
    <div className={styles.cardWrapper} onClick={handleNavigate}>
      <div className={styles.cardContaint}>
        <div className={styles.left}>
          <img className={styles.hotelImage} src={hotelImage} alt="hotel" />
        </div>
        <div className={styles.right}>
          <h3>{hotel.name}</h3>
          <p>{hotel.address}</p>
          <div className={styles.ratingsContainer}>
            <div>
              <span className={styles.ratings}>8.1</span>
              <span className={styles.reviews}>24+ reviews</span>
            </div>
            <p>Verry Good</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
