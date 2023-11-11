import React from "react";
import styles from "./Stars.module.css";
import fullStar from "../../assets/images/stars/fullStar.png";
import halfStar from "../../assets/images/stars/halfStar.png";
import emptyStar from "../../assets/images/stars/emptyStar.png";
const Stars = () => {
  return (
    <div className={styles.stars}>
      <img src={fullStar} alt="" />
      <img src={fullStar} alt="" />
      <img src={fullStar} alt="" />
      <img src={halfStar} alt="" />
      <img src={emptyStar} alt="" />
    </div>
  );
};
export default Stars;
