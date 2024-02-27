import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InitialScreen from "./pages/onBoarding/InitialScreen";
import SignUp from "./pages/signup/SignUp";
import OnBoarding from "./pages/onBoarding/OnBoarding";
import Login from "./pages/login/Login.JSX";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialScreen />} />
        <Route path="/on-boarding" element={<OnBoarding />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<Login />} />
      </Routes>
    </Router>
  );
}
export default App;
