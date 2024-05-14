/* eslint-disable react/prop-types */
/* eslint-disable no-constant-condition */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { NavBar } from "../../components/NavBar";
import { Button } from "../../components/Button";
import AppWrapper from "../../components/AppWrapper";
import EmailField from "../../components/input-fields/EmailField";
import PasswordField from "../../components/input-fields/PasswordField";
import HorizontalDash from "../../components/HorizontalDash";
import OTPInput from "../../components/input-fields/OTPInput";
import { getOTP, resetPassword, verifyOTP } from "../../services/apiAuths";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [step, setStep] = useState(0);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordIsFocus, setPasswordIsFocus] = useState(false);
  const [OTPBoxColor, setOTPBoxColor] = useState("");
  const [OTP, setOTP] = useState([]);
  const [userID, setUserID] = useState(null);

  const [inputValid, setIsInputValid] = useState(false);

  useEffect(() => {
      if (step === 0) {
        setIsInputValid(isValidEmail);
      } else if (step === 2) {
        setIsInputValid(isValidPassword);
      } else {
        setIsInputValid(false);
      }
  }, [isValidEmail, isValidPassword, step]);
  const navigate = useNavigate();

  async function handleSubmitPin(pin) {
    //Check if OTP is correct then...
    if (pin.length === 4) {
      const jsonData = {
        otp: pin,
        user_id: userID,
      };

      const data = await verifyOTP(jsonData);

      if (data.status === 200) {
        setStep((step) => step + 1);
        setOTP([]);
      } else if (data.status === 400) {
        setOTPBoxColor("border-error focus:outline-error");
      }
    }
  }

  async function handleSubmitEmail(e) {
    e?.preventDefault();
    const data = await getOTP(email);
    if (data.status === 404) {
      toast.error("No active account with the email is found");
    } else if (data.status === 200) {
      setUserID(data.data.user_id);
      setStep((step) => step + 1);
      setEmail("");
    }
  }

  async function handleSubmitPassword(e) {
    e?.preventDefault();
    const jsonData = { new_password: password };
    const data = await resetPassword(jsonData, userID);
    if (data.status === 200) {
      navigate("/reset-password-success");
      setPassword("");
    } else {
      toast.error(data.data);
    }
  }

  function handleBtnClick() {
    if (step === 0) {
      setIsInputValid(false);
      handleSubmitEmail();
    } else if (step === 1) {
      handleSubmitPin(OTP.join(""));
    } else if (step === 2) {
      handleSubmitPassword();
    }
  }

  return (
    <AppWrapper>
      <NavBar
        navigationFn={
          step !== 0
            ? () => {
                setStep((step) => step - 1);
                setIsValidEmail(false)
              }
            : null
        }
      >
        Forgotten your Password?
      </NavBar>
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
          onResendCode={handleSubmitEmail}
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
      {step !== 1 && (
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
      )}
    </AppWrapper>
  );
}
