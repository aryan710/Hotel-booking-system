import React from "react";
import styles from "./BookingCard.module.css";
import roomImage from "../../assets/images/hotel2.webp";
import { format } from "date-fns";
import arrow from "../../assets/images/Right Arrow.png";
const BookingCard = ({ booking }) => {
  return (
    <div className={styles.bookingCardContainer}>
      <div className={styles.bookingCardInnerContainer}>
        <div className={styles.image}>
          <img src={roomImage} alt="" width={150} />
        </div>
        <div className={styles.details}>
          <h3>{booking.hotelName}</h3>
          <div className={styles.checkInOut}>
            <button className={`${styles.check} ${styles.btn}`}>
              {format(new Date(booking.checkInDate), "dd/MM/yyyy")}
            </button>
            <button className={styles.btn}>
              <img src={arrow} alt="" width={20} />
            </button>
            <button className={`${styles.check} ${styles.btn}`}>
              {format(new Date(booking.checkOutDate), "dd/MM/yyyy")}
            </button>
          </div>
          <div className={styles.bookingStatus}>
            <button className={
                    booking.status === "confirmed"
                      ? `${styles.btn} ${styles.confirmed}`
                      : booking.status === "canceled"
                      ? `${styles.btn} ${styles.canceled}`
                      : `${styles.btn} ${styles.pending}`
                  }>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
