import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "@mui/material/Button";
import styles from "./PaymentSuccess.module.css";
import animation from "../../assets/images/Animation - 1700465005846.gif";
const PaymentSuccess = () => {
  const seachQuery = useSearchParams()[0];
  const navigate = useNavigate();
  const referenceNum = seachQuery.get("reference");
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.heading}>
          <img src={animation} alt="" width={50} />
          <h1>Payment Successful</h1>
        </div>
        <h3>
          Refrense No. : <span>{referenceNum}</span>
        </h3>
        <div className={styles.btns}>
          <Button variant="contained" onClick={() => navigate("/hotels")}>
            Home
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/my-bookings")}
          >
            Your Bookings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
