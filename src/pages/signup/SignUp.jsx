/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  return (
    <div
      className="px-4 pt-4 pb-7 grid 
    bg-white-3 my-0 mx-auto w-screen h-screen 
    max-w-screen-sm font-montserrat auto-rows-max"
    >
      <NavBar>Sign Up</NavBar>
      <WelcomeMessage>Welcome to FudHouse</WelcomeMessage>
      <SignUpForm />
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function NavBar({ children }) {
  const navigate = useNavigate();

  function handleNavigateToHome() {
    navigate("/on-boarding");
  }
  return (
    <div
      className="
    grid grid-cols-2 h-7 items-center w-full"
    >
      <svg
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleNavigateToHome}
      >
        <path
          d="M16 7.5H3.83L9.42 1.91L8 0.5L0 8.5L8 16.5L9.41 15.09L3.83 9.5H16V7.5Z"
          fill="#151425"
        />
      </svg>
      <h4 className="text-xl font-semibold text-grey-6">{children}</h4>
    </div>
  );
}

function WelcomeMessage({ children }) {
  return (
    <h3 className="mt-5 font-semibold text-grey-6 text-2xl">{children}</h3>
  );
}

function SignUpForm() {
  return (
    <form className="mt-6 h-[476px] w-full">
      <div className="grid auto-rows-max gap-4 h-[344px]">
        <Input />
      </div>
      <div className="mt-6 h-[84px]"></div>
    </form>
  );
}

function Input() {
  return (
    <div className="grid auto-rows-max gap-2 h-[74px] text-grey-5">
      <label className="relative grid auto-rows-max gap-2 h-[74px] text-grey-5">
        <span className="text-xs font-medium"> Full name</span>
        <svg
          className="absolute left-[10px] flex items-center justify-center bottom-[13px]"
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
            fill="#63626E"
          />
        </svg>

        <input
          className="block h-12 opacity-0.5 py-4 pr-[10px] pl-[42px] w-full bg-transparent border
           rounded-lg shadow-sm
          placeholder:text-xs placeholder:text-grey-5 placeholder:font-medium
        placeholder:font-montserrat placeholder:p-2"
          placeholder="Enter full name"
          type="text"
          name="fname"
        />
      </label>
    </div>
  );
}
