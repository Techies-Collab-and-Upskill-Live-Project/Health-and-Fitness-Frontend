import { useEffect, useState } from "react";
import ProfileGenderScreen from "./ProfileGenderScreen";
import ProfileNutritionalGoal from "./ProfileNutritionalGoal";
import ProfileDOBScreen from "./ProfileDOBScreen";

export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [showGenderScreen, setShowGenderScreen] = useState(false);
  const [showDOBScreen, setshowDOBScreen] = useState(false);

  return (
    <div className="grid justify-center items-center relative my-0 mx-auto w-screen h-screen max-w-screen-sm">
      {isLoading && !showGenderScreen && !showDOBScreen && (
        <div className="absolute z-[2]">
          <ProfileNutritionalGoal setShowGenderScreen={setShowGenderScreen} />
        </div>
      )}
      {showGenderScreen && !showDOBScreen && (
        <div className="absolute z-[2]">
          <ProfileGenderScreen setshowDOBScreen={setshowDOBScreen}/>
        </div>
      )}
       {showDOBScreen && (
        <div className="absolute z-[2]">
          <ProfileDOBScreen/>
        </div>
      )}
    </div>
  );
}
