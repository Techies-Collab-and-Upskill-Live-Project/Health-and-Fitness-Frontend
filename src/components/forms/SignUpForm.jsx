import { useState } from "react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { registerUser } from "../../services/apiAuths";
import { InputField } from "../input-fields/InputField";
import { Button } from "../Button";
import EmailField from "../input-fields/EmailField";
import PasswordField from "../input-fields/PasswordField";
import { useCustomMutation } from "../../hooks/useCustomMutation";
import { InlineSpinner } from "../InlineSpinner";

export function SignUpForm() {
  const [fname, setFName] = useState("");

  const [username, setUsername] = useState("");

  const [fNameIsFocus, setFNameIsFocus] = useState(false);
  const [usernameIsFocus, setUsernameIsFocus] = useState(false);

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidFName, setIsValidFName] = useState(false);
  const [isValidUName, setIsValidUName] = useState(false);

  const isValid =
    isValidEmail && isValidFName && isValidUName && isValidPassword;

  const navigate = useNavigate();

  const { mutate, status } = useCustomMutation(
    registerUser,
    (data) => {
      if (data.status == 201) {
        localStorage.setItem("email", data.data.email);
        navigate("/account/activate");
      } else {
        Object.entries(data.data).forEach(([fieldName, errorMessages]) => {
          errorMessages.forEach((errorMessage) => {
            toast.error(`${fieldName}: ${errorMessage}`); //Make toast
          });
        });
      }
    },
    (err) => toast.error(err.message)
  );

  function handleFNameChange(e) {
    setFName(e.target.value);
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    mutate(formData);
  }

  return (
    <form onSubmit={(e) => handleFormSubmit(e)} className="mt-6 w-full">
      <div className="grid auto-rows-max gap-4">
        <InputField
          name="fullname"
          label="Full name"
          placeholder="Enter full name"
          title="Enter a valid full name (letters, spaces, hyphens, and apostrophes only)"
          onChange={handleFNameChange}
          value={fname}
          onFocus={setFNameIsFocus}
          onKeyUp={() => {
            fname.length >= 1 && /^[ A-Za-z.-]+$/.test(fname)
              ? setIsValidFName(true)
              : setIsValidFName(false);
          }}
          isValidName={isValidFName}
          errorText={
            !isValidFName &&
            fname.length > 0 && (
              <p className="text-error text-xs">
                Names should include only letters, whitespaces, dots or hyphens
              </p>
            )
          }
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
                fNameIsFocus || isValidFName ? "fill-grey-6" : "fill-grey-4"
              }`}
            />
          </svg>
        </InputField>
        <EmailField
          isValidEmail={isValidEmail}
          setIsValidEmail={setIsValidEmail}
        />
        <InputField
          name="username"
          label="User name"
          placeholder="Enter user name"
          title="Username must be of three or more characters"
          onChange={handleUsernameChange}
          value={username}
          onFocus={setUsernameIsFocus}
          onKeyUp={() => {
            username.length >= 3
              ? setIsValidUName(true)
              : setIsValidUName(false);
          }}
          isValidName={isValidUName}
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
                usernameIsFocus || isValidUName ? "fill-grey-6" : "fill-grey-4"
              }`}
            />
          </svg>
        </InputField>
        <PasswordField
          label="Password"
          isValidPassword={isValidPassword}
          setIsValidPassword={setIsValidPassword}
        />
      </div>
      <div className="mt-6 grid gap-4 h-[84px]">
        <Button
          type={"submit"}
          isValid={isValid && status !== "pending"}
          width="w-full"
          bgColor={`transition duration-300 ${
            isValid && status !== "pending" ? "bg-primary-9" : "bg-grey-1"
          }`}
        >
          {status === "pending" ? (
            <InlineSpinner type="Signing up" />
          ) : (
            "Sign Up"
          )}
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
