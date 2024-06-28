import { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import Spinner from "./components/Spinner";

const SplashScreen = lazy(() => import("./components/SplashScreen"));
const SignUp = lazy(() => import("./pages/signup/SignUp"));
const Login = lazy(() => import("./pages/login/Login"));
const ProfileScreen = lazy(() => import("./pages/profile/ProfileScreenMain"));
const ResetPassword = lazy(() =>
  import("./pages/reset-password/ResetPassword")
);
const PasswordResetSuccess = lazy(() =>
  import("./pages/passwordResetSuccess/PasswordResetSuccess")
);
const WelcomeScreen = lazy(() => import("./pages/onBoarding/WelcomeScreen"));
const ActivateAccount = lazy(() =>
  import("./pages/accountActivation/ActivateAccount")
);
const ActivateAccountSuccess = lazy(() =>
  import("./pages/ActivationSuccess/ActivationSuccess")
);

const Diary = lazy(() => import("./pages/diary/UserDiary"));
const MealPlanner = lazy(() => import("./pages/mealPlanner/MealPlanner"));
const Account = lazy(() => import("./pages/Account/Account"));
const Recipes = lazy(() => import("./pages/Recipes/Recipes"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the delay time in milliseconds (e.g., 2000 for 2 seconds)

    return () => clearTimeout(); // Cleanup to avoid memory leaks
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              !isLoading ? (
                <Suspense fallback={<SplashScreen />}>
                  {" "}
                  {<WelcomeScreen />}
                </Suspense>
              ) : (
                <SplashScreen />
              )
            }
          ></Route>
          <Route
            path="/sign-up"
            element={
              <Suspense fallback={<Spinner />}>
                <SignUp />
              </Suspense>
            }
          />
          <Route
            path="/log-in"
            element={
              <Suspense fallback={<Spinner />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<Spinner />}>
                <ProfileScreen />
              </Suspense>
            }
          />
          <Route
            path="/reset-password"
            element={
              <Suspense fallback={<Spinner />}>
                <ResetPassword />
              </Suspense>
            }
          />
          <Route
            path="/reset-password-success"
            element={
              <Suspense fallback={<Spinner />}>
                <PasswordResetSuccess />
              </Suspense>
            }
          />
          <Route
            path="/account/activate"
            element={
              <Suspense fallback={<Spinner />}>
                <ActivateAccount />
              </Suspense>
            }
          />
          <Route
            path="/account/activate/success"
            element={
              <Suspense fallback={<Spinner />}>
                <ActivateAccountSuccess />
              </Suspense>
            }
          />
          <Route
            path="/diary"
            element={
              <Suspense fallback={<Spinner />}>
                <Diary />
              </Suspense>
            }
          />
          <Route
            path="/meal-planner"
            element={
              <Suspense fallback={<Spinner />}>
                <MealPlanner />
              </Suspense>
            }
          />
          <Route
            path="/account"
            element={
              <Suspense fallback={<Spinner />}>
                <Account />
              </Suspense>
            }
          />
          <Route
            path="/recipe"
            element={
              <Suspense fallback={<Spinner />}>
                <Recipes />
              </Suspense>
            }
          />
        </Routes>
      </Router>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#E5F6D3",
            color: "#3C3B49",
          },
        }}
      />
    </QueryClientProvider>
  );
}
export default App;
