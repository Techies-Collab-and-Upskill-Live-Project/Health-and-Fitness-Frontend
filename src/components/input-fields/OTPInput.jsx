import { useRef, useState } from "react";

/* eslint-disable react/prop-types */
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

export default OTPInput;
