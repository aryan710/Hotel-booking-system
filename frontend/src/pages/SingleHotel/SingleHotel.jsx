import React from "react";
import styles from "./SingleHotel.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import hotel1 from "../../assets/images/hotel1.webp";
import hotel2 from "../../assets/images/hotel2.webp";
import hotel3 from "../../assets/images/hotel3.webp";
import ImgSlider from "../../components/ImgSlider/ImgSlider";
import locationImage from "../../assets/images/location.png";
import callImage from "../../assets/images/contactNo.png";
import Stars from "../../components/Stars/Stars";
import RoomTypeCard from "../../components/RoomTypeCard/RoomTypeCard";
import { useSelector } from "react-redux";
import { useSingleHotels } from "../../hooks/useSingleHotel";
import Loader from "../Loader/Loader";
const hotels = [hotel1, hotel2, hotel3];
const SingleHotel = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading } = useSingleHotels(id);
  const { isAuth } = useSelector((state) => state.auth);
  const hotel = useSelector((state) => state.allhotels.singleHotel);
  if (Object.keys(hotel).length === 0) {
    navigate(`/singlehotel/${id}`);
  }
  const handleBooking = () => {
    navigate(`/booking/${hotel._id}`);
  };
  return (
    <div className={styles.sHotelWrapper}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.mainHeader}>
            <Link to={"/"}>
              <h3>Home</h3>
            </Link>
            <h3>/</h3>
            <Link to={"/hotels"}>
              <h3>Hotels</h3>
            </Link>
            <h3>/</h3>
            <h3>{hotel.name}</h3>
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
                  <h1>{hotel.name}</h1>
                  <h3>A marvelous hotel in the heart of the city</h3>
                  <div className={styles.StateCity}>
                    <span>{hotel.location.city}</span>
                    <span>{hotel.location.state}</span>
                  </div>
                  <p className={styles.address}>
                    <img src={locationImage} alt="" />
                    {hotel.address}
                  </p>
                  <p className={styles.phone}>
                    <img src={callImage} alt="" />
                    {hotel.contact_number}
                  </p>
                  <div className={styles.bookBtn}>
                    {isAuth ? (
                      <button onClick={handleBooking}>Book Now</button>
                    ) : (
                      <button onClick={()=>navigate('/signin')}>Book Now</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.rooms}>
              <h1>Room Types</h1>
              <div className={styles.typesWrapper}>
                {hotel.rooms.map((room, index) => {
                  return <RoomTypeCard key={index} room={room} />;
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleHotel;
