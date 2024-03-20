import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InitialScreen from "./pages/onBoarding/InitialScreen";
import SignUp from "./pages/signup/SignUp";
import OnBoarding from "./pages/onBoarding/OnBoarding";
import ProfileScreen from "./pages/profile/ProfileScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialScreen />} />
        <Route path="/on-boarding" element={<OnBoarding />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>
    </Router>
  );
}
export default App;
