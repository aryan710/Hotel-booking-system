import React, { useState } from "react";
import styles from "./HotelForm.module.css";
import { Button, TextField } from "@mui/material";
import ContactDetails from "./ContactDetails/ContactDetails";
import AddressDetails from "./AddressDetails/AddressDetails";

const Steps = {
  1: ContactDetails,
  2: AddressDetails,
};

const HotelForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const nextStep = () => {
    if (currentStep === 2) return;
    else setCurrentStep(currentStep + 1);
  };
  const Step = Steps[currentStep];
  return (
    <>
      <Step nextStep={nextStep} />
    </>
  );
};

export default HotelForm;
