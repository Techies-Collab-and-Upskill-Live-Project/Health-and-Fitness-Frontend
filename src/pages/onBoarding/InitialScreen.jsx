import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SplashScreen from "../../components/SplashScreen";
import WelcomeScreen from "./WelcomeScreen";

export default function InitialScreen() {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      navigate("/on-boarding"); // Trigger transition after the delay
    }, 2000); // Adjust the delay time in milliseconds (e.g., 2000 for 2 seconds)

    return () => clearTimeout(); // Cleanup to avoid memory leaks
  }, [navigate]);

  return (
    <div
      className="grid 
    justify-center items-center relative my-0 mx-auto w-screen h-dvh overflow-auto max-w-screen-sm"
    >
      {isLoading && (
        <div className="absolute z-[2]">
          <SplashScreen />
        </div>
      )}
      <div className="absolute z-[1]">
        <WelcomeScreen />
      </div>
    </div>
  );
}
