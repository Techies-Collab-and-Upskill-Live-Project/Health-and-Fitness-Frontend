import { useState } from "react";
import ProfileGenderScreen from "./ProfileGenderScreen";
import ProfileNutritionalGoal from "./ProfileNutritionalGoal";
import ProfileDOBScreen from "./ProfileDOBScreen";
import ProfileWeightScreen from "./ProfileWeightScreen";

export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [showGenderScreen, setShowGenderScreen] = useState(false);
  const [showDOBScreen, setshowDOBScreen] = useState(false);
  const [showWeightScreen,setshowWeightScreen]=useState(false);
  return (
    <div className="grid justify-center items-center relative my-0 mx-auto w-screen h-screen max-w-screen-sm">
      {isLoading && !showGenderScreen && !showDOBScreen && !showWeightScreen && (
        <div className="absolute z-[2]">
          <ProfileNutritionalGoal setShowGenderScreen={setShowGenderScreen} />
        </div>
      )}
      {showGenderScreen && !showDOBScreen && !showWeightScreen && (
        <div className="absolute z-[2]">
          <ProfileGenderScreen setshowDOBScreen={setshowDOBScreen}/>
        </div>
      )}
       {showDOBScreen && !showWeightScreen &&(
        <div className="absolute z-[2]">
          <ProfileDOBScreen setshowWeightScreen={setshowWeightScreen}/>
        </div>
      )}
       {showWeightScreen &&(
        <div className="absolute z-[2]">
          <ProfileWeightScreen/>
        </div>
      )}
    </div>
  );
}
