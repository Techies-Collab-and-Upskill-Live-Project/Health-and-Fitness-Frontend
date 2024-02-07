import { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import OnBoarding from "./pages/OnBoarding";
// const OnBoarding = React.lazy(() => import("./pages/OnBoarding"));
function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleTransition = () => {
    setIsLoading(true);
  };

  return (isLoading ? (
    <OnBoarding />
  ) : (
    <SplashScreen onTransition={handleTransition} />
  ))
}
export default App;
