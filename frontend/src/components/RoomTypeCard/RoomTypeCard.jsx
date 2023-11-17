import React from "react";
import styles from './RoomTypeCard.module.css';
import personImg from "../../assets/images/person.png";
const RoomTypeCard = ({ room }) => {
  return (
    <div className={styles.roomTypeWrapper}>
      <div className={styles.imgDiv}>
        <img src={room.room_image} alt="img" width={250} />
      </div>
      <div className={styles.typeName}>
        <h4>{room.room_type}</h4>
        <div>
          <span>3</span>
          <img src={personImg} alt="" />
        </div>
      </div>
      <div className={styles.price}>
        <h5>Price:</h5>
        <span>₹ {room.price_per_nigh}</span>
      </div>
      <div className={styles.available}>
        <h5>Available:</h5>
        <span>{room.total_room_available} rooms</span>
      </div>
    </div>
  );
};

export default RoomTypeCard;
