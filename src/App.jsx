import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import InitialScreen from "./pages/onBoarding/InitialScreen";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import ProfileScreen from "./pages/profile/ProfileScreenMain";
import ResetPassword from "./pages/reset-password/ResetPassword";
import PasswordResetSuccess from "./pages/passwordResetSuccess/PasswordResetSuccess";
import WelcomeScreen from "./pages/onBoarding/WelcomeScreen";
import ActivateAccount from "./pages/accountActivation/ActivateAccount";
import ActivateAccountSuccess from "./pages/ActivationSuccess/ActivationSuccess";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Router>
        <Routes>
          <Route path="/" element={<InitialScreen />} />
          <Route path="/on-boarding" element={<WelcomeScreen />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/profile" element={<ProfileScreen />} />
          {/* <Route path="/profile" element={<ProfileScreen />} /> */}
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/reset-password-success"
            element={<PasswordResetSuccess />}
          />
          <Route path="/account/activate" element={<ActivateAccount />} />
          <Route path="/account/activate/success" element={<ActivateAccountSuccess />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
export default App;