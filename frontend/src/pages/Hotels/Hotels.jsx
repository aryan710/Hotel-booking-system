import React from "react";
import styles from "./Hotels.module.css";
import Card from "../../components/Card/Card";
import {useSelector } from "react-redux";
import { useAllHotels } from "../../hooks/useAllHotels";
import Loader from "../Loader/Loader";
const hotelsData = [
  {
    hotelNo: 1,
    approve: false,
    name: "Taj Hotels",
    email: "reservations@ihcltata.com",
    description: "A luxurious hotel in the heart of the city",
    location: {
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
    },
    address:
      "PJ Ramchandani Marg, Apollo Bandar, Colaba, Mumbai, Maharashtra 400001",
    contact_number: "+91 8000381422",
    images: [
      "https://plus.unsplash.com/premium_photo-1670360414903-19e5832f8bc4?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    rooms: [
      {
        room_type: "Standard",
        price_per_night: 5000,
        total_rooms_available: 20,
      },
      {
        room_type: "Delux",
        price_per_night: 7000,
        total_rooms_available: 40,
      },
      {
        room_type: "Supper Delux",
        price_per_night: 10000,
        total_rooms_available: 10,
      },
    ],
  },
  {
    hotelNo: 2,
    approve: false,
    name: "Maha Bodhi Hotel,Resort and Convention Centre",
    email: "sales@mbh.mahabodhihotel",
    description: "A marvelous hotel in the heart of the city",
    location: {
      city: "Gaya",
      state: "Bihar",
      country: "India",
    },
    address:
      "Hariharpur Tekuna Farm - Gyan Bharti Road Hariharpur, Bodh Gaya 824231 India",
    contact_number: "+91 75469 88900",
    images: [
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.booking.com%2Fhotel%2Fin%2Fmaha-bodhi-resort-convention-centre.html&psig=AOvVaw3YOwhrU3XRdu7eArfNskM0&ust=1699432248745000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLD4r8-8sYIDFQAAAAAdAAAAABAD",

      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tripadvisor.in%2FHotel_Review-g424922-d8455031-Reviews-Maha_Bodhi_Hotel_Resort_and_Convention_Centre-Bodh_Gaya_Gaya_District_Bihar.html&psig=AOvVaw3YOwhrU3XRdu7eArfNskM0&ust=1699432248745000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLD4r8-8sYIDFQAAAAAdAAAAABAa",
    ],
    rooms: [
      {
        room_type: "Standard",
        price_per_night: 6600,
        total_rooms_available: 20,
      },
      {
        room_type: "Delux",
        price_per_night: 7800,
        total_rooms_available: 40,
      },
      {
        room_type: "Supper Delux",
        price_per_night: 9000,
        total_rooms_available: 10,
      },
    ],
  },
  {
    hotelNo: 3,
    approve: false,
    name: "HOTEL PATLIPUTRA CONTINENTAL",
    email: "info@hpcpatna.com",
    description: "feel of luxury",
    location: {
      city: "Patna",
      state: "Bihar",
      country: "India",
    },
    address: "PC Bypass Crossing, Anisabad, Patna, Bihar 800002",
    contact_number: "+91 612 225 0204",
    images: [
      "https://unsplash.com/photos/gold-chandelier-on-white-ceiling-ym_EI-DTS1g",

      "https://unsplash.com/photos/person-in-swimming-pool-during-daytime-rlwE8f8anOc",
    ],
    rooms: [
      {
        room_type: "Standard",
        price_per_night: 3000,
        total_rooms_available: 256,
      },
      {
        room_type: "Delux",
        price_per_night: 5000,
        total_rooms_available: 60,
      },
      {
        room_type: "Supper Delux",
        price_per_night: 7000,
        total_rooms_available: 25,
      },
    ],
  },
];

const Hotels = () => {
  const { loading } = useAllHotels();
  const { hotels } = useSelector((state) => state.allhotels);
  return (
    <div className={styles.hotelsWrapper}>
      <div className={styles.hotelsUpperContainer}>
        <div className={styles.hotelsHeader}></div>
        {loading ? (
          <>
            <Loader />
          </>
        ) : (
          <div className={styles.hotelsContainer}>
            {hotels.map((hotel, index) => {
              return <Card key={index} hotel={hotel}/>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotels;
