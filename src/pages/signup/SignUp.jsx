/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { SignUpForm } from "../../components/SignUpForm";
import { SocialSignUp } from "../../components/SocialSignUp";
import { WelcomeMessage } from "../../components/WelcomeMessage";
import { NavBar } from "../../components/NavBar";
import AppWrapper from "../../components/AppWrapper";

export default function SignUp() {
  return (
    <AppWrapper>
      <NavBar>Sign Up</NavBar>
      <WelcomeMessage>Welcome to FudHouse</WelcomeMessage>
      <SignUpForm />
      <div className="full h-20 grid gap-4 mt-6 justify-items-center">
        <SocialSignUp />
        <p className="text-grey-5 font-medium text-[13px]">
          Already have an account?
          <Link to="/log-in" className="text-primary-9">
            {" "}
            Log in
          </Link>
        </p>
      </div>
      <p className="text-grey-5 font-normal w-full text-wrap px-6 text-xs mt-5 text-center">
        by signing up you agree to our terms and conditions and privacy policy.
      </p>
    </AppWrapper>
  );
}
