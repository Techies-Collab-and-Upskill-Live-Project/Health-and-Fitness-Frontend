/* eslint-disable react/prop-types */
/* eslint-disable no-constant-condition */
import { useRef, useState } from "react";
import AppWrapper from "../../components/AppWrapper";
import { NavBar } from "../../components/NavBar";
import EmailField from "../../components/EmailField";
import { Button } from "../../components/Button";
import PasswordField from "../../components/PasswordField";

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
      <div className="mt-6 flex h-full justify-center gap-1">
        <div className="bg-success w-10 h-1 rounded-[100px_0px_0px_100px]"></div>
        <div
          className={`bg-${step >= 1 ? "success" : "grey-1"} w-10 h-1`}
        ></div>
        <div
          className={`bg-${step === 2 ? "success" : "grey-1"} w-10 h-1`}
        ></div>
      </div>

      <p
        className={`${
          step === 2 && "text-center font-semibold h-6"
        } text-black mt-6 h-[88px] text-grey-6 text-base font-medium`}
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
        Continue
      </Button>
    </AppWrapper>
  );
}

function OTPInput({
  length = 4,
  onComplete,
  OTPError,
  OTP,
  setOTP,
  OTPBoxColor,
}) {
  const [activeBox, setActiveBox] = useState(1);

  const inputRef = useRef([]);

  function handleTextChange(input, index) {
    if (isNaN(input)) return;

    if (index > 0 && inputRef.current[index - 1]?.value === "") {
      inputRef.current[index - 1].focus();
      return;
    }

    const newPin = [...OTP];
    newPin[index] = isNaN(input) ? "" : input;
    setOTP(newPin);

    if (input.length === 1 && index < length - 1) {
      inputRef.current[index + 1]?.focus();
      setActiveBox(index + 1);
    }

    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1].focus();
      setActiveBox(index - 1);
    }

    if (newPin.every((digit) => digit !== "")) {
      onComplete(newPin.join(""));
    }
  }

  return (
    <>
      <div className="flex gap-3 h-11 justify-center">
        {Array.from({ length }, (_, index) => (
          <input
            autoFocus={index === 0}
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={OTP[index] || ""}
            onFocus={() => setActiveBox(index)}
            onChange={(e) => handleTextChange(e.target.value, index)}
            ref={(ref) => (inputRef.current[index] = ref)}
            className={`
          text-black w-[42px] text-center outline-white
           focus:outline-1 focus:outline-offset-1
           focus:outline-none transition ${
             activeBox === index
               ? "focus:outline-primary-light"
               : "focus:outline-grey-4"
           }
           ${OTPError}
           focus:border-0 rounded border border-grey-4
            px-[10px] py-[18px]`}
          />
        ))}
      </div>
      {OTPBoxColor.length > 0 && (
        <p className="p-2 text-xs text-center text-error">
          Incorrect or expired code. Try again
        </p>
      )}
      <div className="mt-8 flex justify-between font-montserrat font-medium text-sm">
        <p className="text-primary-8 cursor-pointer">Resend code</p>
        <p className="text-grey-6">00 s</p>
      </div>
    </>
  );
}
