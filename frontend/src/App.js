import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./components/Shared/Navigation/Navigation";
import Hotels from "./pages/Hotels/Hotels";
import SingleHotel from "./pages/SingleHotel/SingleHotel";
import Footer from "./components/Shared/Footer/Footer";
import Register from "./pages/AuthPage/Register/Register";
import Login from "./pages/AuthPage/Login/Login";
import HotelForm from "./pages/HotelForm/HotelForm";
import ReactToaster from "./components/ReactToaster/ReactToaster";
import { useEffect } from "react";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import Loader from "./pages/Loader/Loader";
import BookNow from "./pages/BookNow/BookNow";
import AddRoom from "./pages/AddRoom/AddRoom";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import MyBooking from "./pages/MyBookings/MyBooking";
function App() {
  const {loading} = useLoadingWithRefresh();
  return (
    <div className="App">
      {loading ? (
        <Loader/>
      ) : (
        <BrowserRouter>
          <ReactToaster />
          <Navigation />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/hotel-details" element={<HotelForm />} />
            <Route path="/singlehotel/:id" element={<SingleHotel />} />
            <Route path="/booking/:id" element={<BookNow />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
            <Route path="/my-bookings" element={<MyBooking />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
