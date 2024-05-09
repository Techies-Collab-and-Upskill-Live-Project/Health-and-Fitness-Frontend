import AccountActivationContent from "../../components/AccountActivationContent";
import AppWrapper from "../../components/AppWrapper";
import { NavBar } from "../../components/NavBar";

export default function ActivateAccount() {
  return (
    <AppWrapper>
      <NavBar>Email Activation</NavBar>
      <AccountActivationContent />
    </AppWrapper>
  );
}
