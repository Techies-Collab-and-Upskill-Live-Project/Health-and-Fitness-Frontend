import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import InitialScreen from "./pages/onBoarding/InitialScreen";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import ProfileScreenMain from "./pages/profile/ProfileScreenMain";
//import ProfileScreen from "./pages/profile/ProfileScreen";
import ResetPassword from "./pages/reset-password/ResetPassword";
import PasswordResetSuccess from "./pages/passwordRestSuccess/PasswordResetSuccess";
import WelcomeScreen from "./pages/onBoarding/WelcomeScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialScreen />} />
        <Route path="/on-boarding" element={<WelcomeScreen />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/profile" element={<ProfileScreenMain />} />
        {/* <Route path="/profile" element={<ProfileScreen />} /> */}
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/reset-password-success"
          element={<PasswordResetSuccess />}
        />
      </Routes>
    </Router>
  );
}
export default App;
