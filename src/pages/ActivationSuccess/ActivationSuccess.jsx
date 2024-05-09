import AccountActivationSuccessContent from "../../components/AccountActivationSuccessContent";
import AppWrapper from "../../components/AppWrapper";
import { NavBar } from "../../components/NavBar";

export default function ActivateAccountSuccess() {
  return (
    <AppWrapper>
      <NavBar type="text">Activation Successful</NavBar>
      <AccountActivationSuccessContent />
    </AppWrapper>
  );
}
