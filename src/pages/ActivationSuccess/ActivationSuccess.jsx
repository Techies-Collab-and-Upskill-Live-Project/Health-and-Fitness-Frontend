import AccountActivationSuccessContent from "../../components/AccountActivationSuccessContent";
import AppWrapper from "../../components/AppWrapper";
import { NavBar } from "../../components/NavBar";

export default function ActivateAccountSuccess() {
    localStorage.removeItem("email");
  //Check for email in the local storage, if found delete and render page else redirect to login page
  return (
    <AppWrapper>
      <NavBar type="text">Activation Successful</NavBar>
      <AccountActivationSuccessContent />
    </AppWrapper>
  );
}
