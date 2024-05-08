/* eslint-disable react/prop-types */
import { useState } from "react";
import { InputField } from "./InputField";

function PasswordField({
  label,
  isValidPassword,
  setIsValidPassword,
  setTempPass,
}) {
  const [password, setPassword] = useState("");
  const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  const [passwordIsFocus, setPasswordIsFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    if (setTempPass != null){
      setTempPass(e.target.value);
    }
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <InputField
      type={showPassword ? "text" : "password"}
      name="password"
      label={label}
      placeholder="Enter password here"
      paddingLeft="pl-4"
      title="Enter a strong password (at least 8 characters including uppercase, lowercase, digits, and special characters)"
      onChange={handlePasswordChange}
      value={password}
      onFocus={setPasswordIsFocus}
      focused={passwordIsFocus}
      onKeyUp={() => {
        passwordRegEx.test(password)
          ? setIsValidPassword(true)
          : setIsValidPassword(false);
      }}
      isValidPassword={isValidPassword}
      errorText={
        !isValidPassword &&
        password.length > 0 && (
          <p className="text-error text-xs">
            Your password does not meet the requirements
          </p>
        )
      }
    >
      {showPassword ? (
        <img
          className="cursor-pointer absolute right-4 flex items-center justify-center bottom-[12px]"
          src="/ShowPassword.png"
          alt="Password is visible icon"
          onClick={handleShowPassword}
        />
      ) : (
        <svg
          className="cursor-pointer absolute right-4 flex items-center justify-center bottom-[14px]"
          width="22"
          height="20"
          viewBox="0 0 22 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleShowPassword}
        >
          <path
            d="M2.9799 6.22257C2.05679 7.31382 1.35239 8.59601 0.934326 10.0015C2.22562 14.338 6.24308 17.5 10.9991 17.5C11.9916 17.5 12.952 17.3623 13.8622 17.1049M5.2276 4.22763C6.88385 3.13558 8.86768 2.5 10.9999 2.5C15.7559 2.5 19.7734 5.66205 21.0647 9.99852C20.3528 12.3919 18.8105 14.4277 16.772 15.772M5.2276 4.22763L1.99997 1M5.2276 4.22763L8.87865 7.87868M16.772 15.772L20 19M16.772 15.772L13.1213 12.1213M13.1213 12.1213C13.6642 11.5784 14 10.8284 14 10C14 8.34315 12.6568 7 11 7C10.1715 7 9.42154 7.33579 8.87865 7.87868M13.1213 12.1213L8.87865 7.87868"
            stroke="#151425"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </InputField>
  );
}

export default PasswordField;
