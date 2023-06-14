import { useState } from "react";
import { useStateContext } from "../contexts/AuthContext";

export default function StepperControl({ handleClick, currentStep, steps }) {
  console.log(currentStep);
  const { handleSignup } = useStateContext();
  const { isSuccess, firstName, lastName, addData } = useStateContext();
  const handleNext = async () => {
    await handleSignup();
    if (isSuccess) {
      handleClick("next");
    } else if (currentStep === 2) {
      addData();
      handleClick("next");
    }
  };
  return (
    <div className="container mt-4 mb-8 flex justify-between items-center">
      <button
        onClick={() => handleClick()}
        className={`cursor-pointer md:block hidden rounded-xl border-2 border-slate-300 bg-white py-2 px-4 font-semibold uppercase text-slate-400 transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white  ${
          currentStep === 1 ? " cursor-not-allowed opacity-50 " : ""
        }`}
      >
        Back
      </button>

      <button onClick={() => handleNext()} className="btn">
        Continue
      </button>
    </div>
  );
}
