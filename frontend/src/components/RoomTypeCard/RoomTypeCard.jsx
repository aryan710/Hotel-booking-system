import React from "react";
import styles from './RoomTypeCard.module.css';
import personImg from "../../assets/images/person.png";
const RoomTypeCard = ({ hotel }) => {
  return (
    <div className={styles.roomTypeWrapper}>
      <div className={styles.imgDiv}>
        <img src={hotel} alt="img" width={250} />
      </div>
      <div className={styles.typeName}>
        <h4>Standard</h4>
        <div>
          <span>3</span>
          <img src={personImg} alt="" />
        </div>
      </div>
      <div className={styles.price}>
        <h5>Price:</h5>
        <span>₹ 1000</span>
      </div>
      <div className={styles.available}>
        <h5>Available:</h5>
        <span>20 rooms</span>
      </div>
    </div>
  );
};

export default RoomTypeCard;
