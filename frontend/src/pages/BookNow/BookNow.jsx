import React, { useEffect, useState } from "react";
import BookForm from "./BookForm/BookForm";
import PayNow from "./PayNow/PayNow";
const steps = {
  1: BookForm,
  2: PayNow,
};

const BookNow = () => {
  const [step, setStep] = useState(1);

  const Step = steps[step];
  const nextStep = () => {
    if (step === 2) return;
    setStep(step + 1);
  };



  return (
    <>
      <Step nextStep={nextStep} />
    </>
  );
};

export default BookNow;
