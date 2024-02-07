import { Suspense } from "react";
import SplashScreen from "./components/SplashScreen";
import OnBoarding from "./pages/OnBoarding";
function App() {
  return (
    // <Suspense fallback={<SplashScreen />}>
    //   <OnBoarding />
    // </Suspense>
    <OnBoarding />
  );
}
export default App;
