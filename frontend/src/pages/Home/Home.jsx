import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.hero}>
          <h2>Welcome to Hotelin.com</h2>
          <p>Book your luxurious stay now!</p>
          <Link to={"/hotels"} className={styles.btn}>
            Book Now
          </Link>
        </div>
      </div>
      <section id="gallery" className={styles.section}>
        <h2>Gallery</h2>

        <div>
          <img
            src="https://developer.nvidia.com/blog/wp-content/uploads/2018/10/hotel_bild.jpg"
            alt="Hotel123"
            width="400px"
          />
          <img
            src="https://pierpointusa.com/wp-content/uploads/2019/08/pasted-image-0-76.png"
            alt="Hotel456"
            width="395px"
          />
          <img
            src="https://assets.vogue.com/photos/598347213d1b9911785cd52a/master/pass/pink-hotels-amanjena-marrakech.jpg"
            alt="Hotel789"
            width="395px"
          />
          <img
            src="https://media.cntraveller.com/photos/61a65154b2a87fcf2e68748a/16:9/w_2580,c_limit/CHOUCHOU%20HD%20nov21-%C2%A9%20Nicolas%20Anetson-98.jpeg"
            alt="Hotel000"
            width="395px"
          />
          <img
            src="https://res.cloudinary.com/purnesh/image/upload/f_auto/v1636716386/oberoinewdelhi-254495953-253651096789372-1664416785438353889-n1.jpg"
            alt="Hotel111"
            width="395px"
          />
        </div>
      </section>
    </>
  );
};

export default Home;
