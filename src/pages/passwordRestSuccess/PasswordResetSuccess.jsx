import PasswordSuccessContainer from "../../components/PasswordSuccessContainer";
import AppWrapper from "../../components/AppWrapper";
import HorizontalDash from "../../components/HorizontalDash";
import { NavBar } from "../../components/NavBar";

function PasswordResetSuccess() {
  return (
    <AppWrapper>
      <NavBar type="text">Forgotten your Password?</NavBar>
      <HorizontalDash />
      <PasswordSuccessContainer />
    </AppWrapper>
  );
}

export default PasswordResetSuccess;
