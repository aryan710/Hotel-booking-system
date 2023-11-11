import React, { useState } from "react";
import styles from "./SingleHotel.module.css";
import { Link } from "react-router-dom";
import hotel1 from "../../assets/images/hotel1.webp";
import hotel2 from "../../assets/images/hotel2.webp";
import hotel3 from "../../assets/images/hotel3.webp";
import ImgSlider from "../../components/ImgSlider/ImgSlider";
import locationImage from "../../assets/images/location.png";
import callImage from "../../assets/images/contactNo.png";
import Stars from "../../components/Stars/Stars";
import RoomTypeCard from "../../components/RoomTypeCard/RoomTypeCard";
import Footer from "../../components/Shared/Footer/Footer";
const hotels = [hotel1, hotel2, hotel3];
const SingleHotel = () => {
  return (
    <div className={styles.sHotelWrapper}>
      <div className={styles.mainHeader}>
        <Link to={"/"}>
          <h3>Home</h3>
        </Link>
        <h3>/</h3>
        <Link to={"/hotels"}>
          <h3>Hotels</h3>
        </Link>
        <h3>/</h3>
        <h3>Maha Bodhi Hotel</h3>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.hotelDetails}>
          <div className={styles.hotel}>
            <ImgSlider hotels={hotels} />
            <div className={styles.right}>
              <div className={styles.ratings}>
                <Stars />
                <div className={styles.ratingNo}>
                  <span className={styles.outOf}>8.1</span>
                  <span className={styles.overAll}>Verry Good</span>
                </div>
              </div>
              <h1>Maha Bodhi Hotel,Resort and Convention Centre</h1>
              <h3>A marvelous hotel in the heart of the city</h3>
              <div className={styles.StateCity}>
                <span>Gaya</span>
                <span>Bihar</span>
              </div>
              <p className={styles.address}>
                <img src={locationImage} alt="" />
                Hariharpur Tekuna Farm - Gyan Bharti Road Hariharpur, Bodh Gaya
                824231 India
              </p>
              <p className={styles.phone}>
                <img src={callImage} alt="" />
                +91 75469 88900
              </p>
              <div className={styles.bookBtn}>
                <button>Book Now</button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rooms}>
          <h1>Room Types</h1>
          <div className={styles.typesWrapper}>
            {hotels.map((hotel, index) => {
              return <RoomTypeCard key={index} hotel={hotel} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleHotel;
