import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AccountActivationContent from "../../components/AccountActivationContent";
import AppWrapper from "../../components/AppWrapper";
import { NavBar } from "../../components/NavBar";

export default function ActivateAccount() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("email") === null) {
      navigate("/log-in");
    }
  }, [navigate]);

  if (localStorage.getItem("email") === null) {
    return null;
  }

  return (
    <AppWrapper>
      <NavBar>Email Activation</NavBar>
      <AccountActivationContent />
    </AppWrapper>
  );
}
