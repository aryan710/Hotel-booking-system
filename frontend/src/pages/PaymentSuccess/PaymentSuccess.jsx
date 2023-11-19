import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const seachQuery = useSearchParams()[0];
  const navigate = useNavigate();
  const referenceNum = seachQuery.get("reference")
  return <div>
    <h1>Order Successfull</h1>
    <h3>Refrense No. {referenceNum}</h3>
    <button onClick={()=>navigate('/my-bookings')}>Your Bookings</button>
    <button onClick={()=>navigate('/hotels')}>Home</button>
  </div>;
};

export default PaymentSuccess;
