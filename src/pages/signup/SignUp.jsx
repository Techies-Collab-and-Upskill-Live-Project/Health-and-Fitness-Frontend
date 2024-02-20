/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { SignUpForm } from "../../components/SignUpForm";

export default function SignUp() {
  return (
    <div
      className="px-4 pt-4 pb-7 grid my-0 mx-auto w-screen h-screen 
    max-w-screen-sm font-montserrat auto-rows-max bg-on-boarding bg-cover bg-white-4"
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
