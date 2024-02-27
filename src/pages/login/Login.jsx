//* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
//import { SignUpForm } from "../../components/SignUpForm";
import { SocialSignUp } from "../../components/SocialSignUp";
import { WelcomeMessage } from "../../components/WelcomeMessage";
import { NavBar } from "../../components/NavBar";

export default function Login() {
  return (
    <div
      className="px-4 pt-4 pb-7 grid my-0 mx-auto
      max-w-screen-sm font-montserrat auto-rows-max 
      bg-on-boarding bg-cover bg-white-4"
    >
      <NavBar>Log in</NavBar>
      <WelcomeMessage>Welcome back!</WelcomeMessage>
      {/* <SignUpForm /> */}
      <div className="full h-20 grid gap-4 mt-6 justify-items-center">
        <SocialSignUp />
        <p className="text-grey-5 font-medium text-[13px]">
          Don&apos;t have an account?
          <Link to="/sign-up" className="text-primary-9">
            {" "}
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
