/* eslint-disable react/prop-types */
import { useState } from "react";
import { InputField } from "./InputField";

export default function EmailField({
  isValidEmail,
  setIsValidEmail,
  setTempEmail,
}) {
  const emailRegEx = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const [email, setEmail] = useState("");
  const [emailIsFocus, setEmailIsFocus] = useState(false);

  function handleEmailChange(e) {
    setEmail(e.target.value);
    if (setTempEmail != null) {
      setTempEmail(e.target.value);
    }
  }

  return (
    <InputField
      type="email"
      name="email"
      label="Email"
      placeholder="Enter email address"
      title="Enter a valid email address"
      onChange={handleEmailChange}
      value={email}
      onFocus={setEmailIsFocus}
      onKeyUp={() => {
        emailRegEx.test(email) ? setIsValidEmail(true) : setIsValidEmail(false);
      }}
      isValidEmail={isValidEmail}
      errorText={
        !isValidEmail &&
        email.length > 0 && (
          <p className="text-xs">
            <span className="text-error">Wrong email address format.</span>{" "}
            &#x2018;name@mail.com&#x2019;
          </p>
        )
      }
    >
      <svg
        className="absolute left-[10px] flex items-center justify-center bottom-[13px]"
        width="22"
        height="18"
        viewBox="0 0 22 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.5 5.6691V14.25C0.5 15.9069 1.84315 17.25 3.5 17.25H18.5C20.1569 17.25 21.5 15.9069 21.5 14.25V5.6691L12.5723 11.1631C11.6081 11.7564 10.3919 11.7564 9.42771 11.1631L0.5 5.6691Z"
          className={`${
            emailIsFocus || isValidEmail ? "fill-grey-6" : "fill-grey-4"
          }`}
        />
        <path
          d="M21.5 3.90783V3.75C21.5 2.09315 20.1569 0.75 18.5 0.75H3.5C1.84315 0.75 0.5 2.09315 0.5 3.75V3.90783L10.2139 9.88558C10.696 10.1823 11.304 10.1823 11.7861 9.88558L21.5 3.90783Z"
          className={`${
            emailIsFocus || isValidEmail ? "fill-grey-6" : "fill-grey-4"
          }`}
        />
      </svg>
    </InputField>
  );
}
