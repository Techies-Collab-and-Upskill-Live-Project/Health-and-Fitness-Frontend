/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { SignUpForm } from "../../components/SignUpForm";
import { Button } from "../../components/Button";

export default function SignUp() {
  return (
    <div
      className="px-4 pt-4 pb-7 grid my-0 mx-auto
    max-w-screen-sm font-montserrat auto-rows-max 
    bg-on-boarding bg-cover bg-white-4"
    >
      <NavBar>Sign Up</NavBar>
      <WelcomeMessage>Welcome to FudHouse</WelcomeMessage>
      <SignUpForm />
      <div className="full h-20 grid gap-4 mt-6 justify-items-center">
        <SocialSignUp />
        <p className="text-grey-5 font-medium text-[13px]">
          Already have an account?
          <Link className="text-primary-9"> Log in</Link>
        </p>
      </div>
      <p className="text-grey-5 font-normal w-full text-wrap px-6 text-xs mt-5 text-center">
        by signing up you agree to our terms and conditions and privacy policy.
      </p>
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

function SocialSignUp() {
  return (
    <div className="h-11 w-full grid gap-3 grid-cols-3">
      <Link>
        <Button
          width="w-full"
          height="h-11"
          shadowBox="shadow-[0px_1px_2px_0px_#1018280d]"
          border="border-[1px] border-[#D0D5DD]"
          bgColor="bg-white-4"
        >
          <img className="m-auto" src={"/google.svg"} alt="Google Icon" />
        </Button>
      </Link>
      <Link>
        <Button
          width="w-full"
          height="h-11"
          shadowBox="shadow-[0px_1px_2px_0px_#1018280d]"
          border="border-[1px] border-[#D0D5DD]"
          bgColor="bg-white-4"
        >
          <img className="m-auto" src={"/facebook.svg"} alt="Facebook Icon" />
        </Button>
      </Link>
      <Link>
        <Button
          width="w-full"
          height="h-11"
          shadowBox="shadow-[0px_1px_2px_0px_#1018280d]"
          border="border-[1px] border-[#D0D5DD]"
          bgColor="bg-white-4"
        >
          <img className="m-auto" src={"/apple.svg"} alt="Apple Icon" />
        </Button>
      </Link>
    </div>
  );
}
