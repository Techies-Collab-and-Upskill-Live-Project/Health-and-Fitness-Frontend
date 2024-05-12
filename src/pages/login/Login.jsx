//* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { SocialSignUp } from "../../components/SocialSignUp";
import { WelcomeMessage } from "../../components/WelcomeMessage";
import { NavBar } from "../../components/NavBar";
import LoginForm from "../../components/forms/LoginForm";
import AppWrapper from "../../components/AppWrapper";

export default function Login() {
  return (
    <AppWrapper>
      <NavBar>Log in</NavBar>
      <WelcomeMessage>Welcome back!</WelcomeMessage>
      <LoginForm />
      <div className="full h-20 grid gap-4 mt-6 justify-items-center">
        <SocialSignUp />
        <p className="text-grey-5 font-medium text-[13px]">
          Don&apos;t have an account?
          <Link to="/sign-up" className="text-primary-9">
            Sign up
          </Link>
        </p>
      </div>
    </AppWrapper>
  );
}
