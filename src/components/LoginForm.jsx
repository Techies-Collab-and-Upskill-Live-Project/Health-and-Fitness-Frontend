import { useState } from "react";
import { Button } from "./Button";
import { InputField } from "./InputField";
import { Link } from "react-router-dom";

function LoginForm() {
  const [passwordIsCorrect, setPasswordIsCorrect] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameIsFocus, setUsernameIsFocus] = useState(false);
  const [passwordIsFocus, setPasswordIsFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const isInputValid = username.length > 0 && password.length > 0;

  function handleFormSubmit(e) {
    e.preventDefault();
    //Log user in or not

    //Assume password is incorrect
    // eslint-disable-next-line no-constant-condition
    if (false) setPasswordIsCorrect(true);
  }
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <form onSubmit={(e) => handleFormSubmit(e)} className="mt-6 w-full">
      <div className="grid auto-rows-max gap-4">
        <InputField
          name="username"
          label="User name"
          placeholder="Enter user name"
          onChange={handleUsernameChange}
          value={username}
          onFocus={setUsernameIsFocus}
          isValidName={username.length > 0}
        >
          <svg
            className="absolute left-[10px] flex items-center justify-center bottom-[10px]"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.6854 19.0971C20.5721 17.3191 21.75 14.7971 21.75 12C21.75 6.61522 17.3848 2.25 12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 14.7971 3.42785 17.3191 5.31463 19.0971C7.06012 20.7419 9.41234 21.75 12 21.75C14.5877 21.75 16.9399 20.7419 18.6854 19.0971ZM6.14512 17.8123C7.51961 16.0978 9.63161 15 12 15C14.3684 15 16.4804 16.0978 17.8549 17.8123C16.3603 19.3178 14.289 20.25 12 20.25C9.711 20.25 7.63973 19.3178 6.14512 17.8123ZM15.75 9C15.75 11.0711 14.0711 12.75 12 12.75C9.92893 12.75 8.25 11.0711 8.25 9C8.25 6.92893 9.92893 5.25 12 5.25C14.0711 5.25 15.75 6.92893 15.75 9Z"
              className={`${
                usernameIsFocus || username.length > 0
                  ? "fill-grey-6"
                  : "fill-grey-4"
              }`}
            />
          </svg>
        </InputField>
        <InputField
          type={showPassword ? "text" : "password"}
          name="password"
          label="Password"
          placeholder="Enter password here"
          paddingLeft="pl-4"
          onChange={handlePasswordChange}
          value={password}
          onFocus={setPasswordIsFocus}
          focused={passwordIsFocus}
          isValidPassword={password.length > 0}
          errorText={
            !passwordIsCorrect && (
              <p className="text-error text-xs">
                Incorrect username or password. Try again
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
      </div>
      <div className="ml-1 flex justify-between font-inter text-sm mt-2">
        <p
          className="cursor-pointer flex gap-1 text-black items-center"
          onClick={() => setKeepLoggedIn((loggedIn) => !loggedIn)}
        >
          {keepLoggedIn ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-check-square-fill text-primary-8"
              viewBox="0 0 16 16"
            >
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            </svg>
          )}
          <span>Keep me logged in</span>
        </p>
        <Link to={"/reset-password"} className="text-error">
          Forgotten Password?
        </Link>
      </div>
      <div className="mt-6 grid gap-4 h-[84px]">
        <Button
          handleClick={handleFormSubmit}
          isValid={isInputValid}
          width="w-full"
          bgColor={`transition duration-300 ${
            isInputValid ? "bg-primary-9" : "bg-grey-1"
          }`}
        >
          Log In
        </Button>
        <div className="grid gap-3 grid-cols-3 items-center w-full h-[20px]">
          <div className="bg-grey-2 border h-0"></div>
          <p className="text-grey-2 text-sm font-normal text-center">
            Or sign up with
          </p>
          <div className="bg-grey-2 border h-0"></div>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
