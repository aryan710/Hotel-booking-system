import React, { useState } from "react";
import styles from "./ImgSlider.module.css";
const ImgSlider = ({ hotels }) => {
  const [hotel, setHotel] = useState(hotels[0]);
  return (
    <div className={styles.left}>
      <div className={styles.bigImg}>
        <img src={hotel} alt="" height={450} width={700} />
      </div>
      <div className={styles.smallImgs}>
        {hotels.map((h, index) => {
          return (
            <div
              className={
                h === hotel
                  ? `${styles.smallImgActive} ${styles.smallImg}`
                  : `${styles.smallImgInactive} ${styles.smallImg}`
              }
            >
              <img
                onClick={() => setHotel(h)}
                key={index}
                src={h}
                alt=""
                height={100}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImgSlider;
