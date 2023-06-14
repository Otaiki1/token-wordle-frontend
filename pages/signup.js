import { useState } from "react";
import Stepper from "../components/Stepper";
import StepperControl from "../components/StepperControl";
import { UseContextProvider } from "../contexts/StepperContext";

import CreateAccount from "../components/steps/CreateAccount";
import AboutYourself from "../components/steps/AboutYourself";
import Final from "../components/steps/Final";
import ConnectWallet from "../components/steps/ConnectWallet";
import Navbar from "../components/Navbar";

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [endReg, setEndReg] = useState(false);

  const steps = ["Create Account", "About Yourself", "Connect Wallet"];

  const regEnd = () => {
    setEndReg(true);
  };

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <CreateAccount />;
      case 2:
        return <AboutYourself />;
      case 3:
        return <ConnectWallet handleClick={regEnd} />;

      default:
        <Final />;
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <>
      <Navbar hideLogin={true} />
      {endReg ? (
        <Final />
      ) : (
        <div className="mx-aut rounded-2xl pb-2 md:w-[80%]">
          {/* Stepper */}
          <div className="horizontal container mt-5">
            <Stepper steps={steps} currentStep={currentStep} />

            <div className="my-10 p-10 ">
              <UseContextProvider>
                {displayStep(currentStep)}
              </UseContextProvider>
            </div>
          </div>

          {/* navigation button */}
          {currentStep !== steps.length && (
            <StepperControl
              handleClick={handleClick}
              currentStep={currentStep}
              steps={steps}
            />
          )}
        </div>
      )}
    </>
  );
}

export default App;
