import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import SingleBooking from "./pages/SingleBooking/SingleBooking";
import { useSelector } from "react-redux";
import EditRoom from "./pages/EditRoom/EditRoom";
import HotelAllBookings from "./pages/HotelAllBooking/HotelAllBookings";
function App() {
  const { loading } = useLoadingWithRefresh();
  const { isAuth, role, activated } = useSelector((state) => state.auth);
  return (
    <div className="App" style={{ "min-height": "100vh" }}>
      {loading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <ReactToaster />
          <Navigation />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route
              path="/hotels"
              element={isAuth && role === "hotel" ? <Home /> : <Hotels />}
            />
            <Route path="/signup" element={<Register />} />
            <Route
              path="/signin"
              element={
                isAuth && role === "customer" ? (
                  <Hotels />
                ) : isAuth && role === "hotel" ? (
                  <Home />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/hotel-details"
              element={
                isAuth && !activated && role === "hotel" ? (
                  <HotelForm />
                ) : (
                  <Home />
                )
              }
            />
            <Route path="/singlehotel/:id" element={<SingleHotel />} />
            <Route
              path="/booking/:id"
              element={isAuth && role === "customer" ? <BookNow /> : <Hotels />}
            />
            <Route
              path="/my-booking/:id"
              element={
                isAuth && role === "customer" ? <SingleBooking /> : <Hotels />
              }
            />
            <Route
              path="/hotel/add-room"
              element={
                isAuth && activated && role === "hotel" ? <AddRoom /> : <Home />
              }
            />
            <Route
              path="/hotel/all-bookings"
              element={
                isAuth && activated && role === "hotel" ? <HotelAllBookings /> : <Home />
              }
            />
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
            <Route path="/my-bookings" element={<MyBooking />} />
            <Route path="/hotel/edit-room" element={ isAuth && activated && role === "hotel" ? <EditRoom /> : <Home />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
