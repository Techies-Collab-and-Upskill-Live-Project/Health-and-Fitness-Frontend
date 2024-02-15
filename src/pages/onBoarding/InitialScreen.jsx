import { useEffect, useState } from "react";
import SplashScreen from "../../components/SplashScreen";
import OnBoarding from "./OnBoarding";

export default function InitialScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Trigger transition after the delay
    }, 2000); // Adjust the delay time in milliseconds (e.g., 2000 for 2 seconds)

    return () => clearTimeout(); // Cleanup to avoid memory leaks
  }, []);
  
  return (
    <div
      className="grid 
    justify-center items-center relative my-0 mx-auto w-screen h-screen max-w-screen-sm"
    >
      {isLoading && (
        <div className="absolute z-[2]">
          <SplashScreen />
        </div>
      )}
      <div className="absolute z-[1]">
        <OnBoarding />
      </div>
    </div>
  );
}
