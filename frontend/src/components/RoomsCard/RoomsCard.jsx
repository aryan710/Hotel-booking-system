import React from "react";
import styles from "./RoomsCard.module.css";
import roomImage from "../../assets/images/hotel2.webp";
const RoomsCard = () => {
  return (
    <div className={styles.bookingCardContainer}>
      <div className={styles.bookingCardInnerContainer}>
        <div className={styles.image}>
          <img src={roomImage} alt="" width={150} />
        </div>
        <div className={styles.details}>
          <h5>Room Type: standard</h5>
          <h5>Rooms Available: 20</h5>
          <h5>Price: ₹2000/-</h5>
        </div>
        <div className={styles.btns}>
          <button className={`${styles.edit} ${styles.btn}` }>Update</button>
          <button className={`${styles.delete} ${styles.btn}`}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default RoomsCard;
