/* eslint-disable react/prop-types */
/* eslint-disable no-constant-condition */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { NavBar } from "../../components/NavBar";
import { Button } from "../../components/Button";
import AppWrapper from "../../components/AppWrapper";
import EmailField from "../../components/input-fields/EmailField";
import PasswordField from "../../components/input-fields/PasswordField";
import HorizontalDash from "../../components/HorizontalDash";
import OTPInput from "../../components/input-fields/OTPInput";

export default function ResetPassword() {
  const [step, setStep] = useState(0);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordIsFocus, setPasswordIsFocus] = useState(false);
  const [OTPBoxColor, setOTPBoxColor] = useState("");
  const [OTP, setOTP] = useState([]);

  const inputValid = step === 0 ? isValidEmail : isValidPassword;

  const navigate = useNavigate();

  function handleSubmitPin(pin) {
    //Check if OTP is correct then...
    if (pin.length === 4) {
      //Assume the code is correct
      if (true) {
        setStep((step) => step + 1);
      } else {
        setOTPBoxColor("border-error focus:outline-error");
      }
    }
  }

  function handleSubmitEmail(e) {
    e?.preventDefault();
    // Send email for verification
    setStep((step) => step + 1);
  }

  function handleSubmitPassword(e) {
    e?.preventDefault();

    //Post password to the API for update
    // and move to the passwordChangedSuccess
    navigate("/reset-password-success");
  }

  function handleBtnClick() {
    if (step === 0) {
      handleSubmitEmail();
    } else if (step === 1) {
      handleSubmitPin(OTP.join(""));
    } else if (step === 2) {
      handleSubmitPassword();
    }
  }
  return (
    <AppWrapper>
      <NavBar>Forgotten your Password?</NavBar>
      <HorizontalDash step={step} />
      <p
        className={`${
          step === 2 && "text-center font-semibold h-6"
        }  mt-6 h-[88px] text-grey-6 text-base font-medium`}
      >
        {step === 0
          ? "To reset your password, provide your registered email address."
          : step === 1
          ? "A 4-digit code has been sent to your registered email address"
          : "Set New Password"}
      </p>
      {step === 0 ? (
        <form onSubmit={handleSubmitEmail}>
          <EmailField
            isValidEmail={isValidEmail}
            setIsValidEmail={setIsValidEmail}
            setTempEmail={setEmail}
          />
        </form>
      ) : step === 1 ? (
        <OTPInput
          onComplete={handleSubmitPin}
          OTPError={OTPBoxColor}
          OTP={OTP}
          setOTP={setOTP}
          OTPBoxColor={OTPBoxColor}
        />
      ) : (
        <form onSubmit={handleSubmitPassword}>
          <PasswordField
            label="Reset Password"
            isValidPassword={isValidPassword}
            setIsValidPassword={setIsValidPassword}
            setTempPass={setPassword}
            setTempPassIsFocus={setPasswordIsFocus}
          />
        </form>
      )}
      <Button
        mt={`${passwordIsFocus ? "mt-[222px]" : "mt-[318px]"}`}
        isValid={inputValid}
        width="w-full"
        bgColor={`transition duration-300 ${
          inputValid ? "bg-primary-9" : "bg-grey-1"
        }`}
        handleClick={handleBtnClick}
      >
        {step === 2 ? "Save password" : "Continue"}
      </Button>
    </AppWrapper>
  );
}
