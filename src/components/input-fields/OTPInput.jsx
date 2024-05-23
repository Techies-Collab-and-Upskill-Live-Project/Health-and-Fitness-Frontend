import { useRef, useState, useEffect } from "react";

/* eslint-disable react/prop-types */
function OTPInput({
  length = 4,
  onComplete,
  OTPError,
  OTP,
  setOTP,
  OTPBoxColor,
  onResendCode,
}) {
  const [activeBox, setActiveBox] = useState(1);
  const [countdown, setCountdown] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

  const inputRef = useRef([]);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (countdown > 1) {
        setCountdown((countdown) => countdown - 1);
      } else {
        setCountdown(0);
      }

      if (countdown === 0) {
        clearInterval(countdownInterval);
        setResendDisabled(false);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [countdown]);

  const handleResendCode = () => {
    setCountdown(60);
    setResendDisabled(true);
    onResendCode();
  };

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
      <div className="mt-2 flex justify-between font-montserrat font-medium text-sm">
        <button
          disabled={resendDisabled}
          className={` ${
            resendDisabled ? "text-grey-4 cursor-not-allowed" : "text-primary-8"
          } cursor-pointer bg-transparent`}
          onClick={handleResendCode}
        >
          Resend code
        </button>
        <p className="text-grey-6">{countdown}s</p>
      </div>
    </>
  );
}

export default OTPInput;
