/* eslint-disable react/prop-types */
import { useContext } from "react";

import AppWrapper from "../../components/AppWrapper";
import { ProfileContext, ProfileProvider } from "../../contexts/Profile";
import { NavBar, ProfileNav } from "./Nav";
import { NextButton } from "./NextButton";
import { GoalScreen } from "./ProfileNutritionalGoal";
import GenderScreen from "./ProfileGenderScreen";
import DOBScreen from "./ProfileDOBScreen";
import WeightScreen from "./ProfileWeightScreen";
import HeightScreen from "./ProfileHeightScreen";
import ActivityScreen from "./ProfileActivityLevel";
import BuildingProfile from "./BuildingProfile";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/apiAuths";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import ProfileOverview from "./ProfileOverview";
import { formatToBackendDate } from "../../utils/helpers";
import { getUserCalorie } from "../../services/apiCalorieLog";
import { DiaryProvider } from "../../contexts/DiaryContext";

export default function Profile() {
  return (
    <ProfileProvider>
      <DiaryProvider>
        <ProfilePage />
      </DiaryProvider>
    </ProfileProvider>
  );
}

function ProfilePage() {
  const { step, isBuilding, showProfileOverview } = useContext(ProfileContext);
  const navigate = useNavigate();
  const date = new Date();

  const { isLoading: isFetchingProfile, data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
  });

  const { isLoading: isFetchingCalorie, data: calorieData } = useQuery({
    queryKey: ["calorie"],
    queryFn: () => getUserCalorie(formatToBackendDate(date)),
  });

  // If user is logged out, redirect to log in page
  if (profileData?.status === 401 || calorieData?.status === 401) {
    navigate("/log-in");
  }

  // If user already have profile, redirect to diary page
  if (profileData?.status === 200) {
    return <ProfileOverview />;
  }

  if (isFetchingProfile || isFetchingCalorie) return <Spinner />;

  return (
    <>
      {showProfileOverview ? (
        <ProfileOverview />
      ) : (
        <AppWrapper bg={isBuilding && "bg-white-4"}>
          <img
            className="h-[17px]"
            src="/Logo plain background.svg"
            alt="FudHouse logo"
          />
          {isBuilding === "idle" ? (
            <BuildingProfile />
          ) : (
            <>
              {step > 0 && <NavBar />}
              <ProfileNav />
              <ProfileContent title={titles[step]} note={notes[step]}>
                {step === 0 ? (
                  <GoalScreen />
                ) : step === 1 ? (
                  <GenderScreen />
                ) : step === 2 ? (
                  <DOBScreen />
                ) : step === 3 ? (
                  <WeightScreen />
                ) : step === 4 ? (
                  <HeightScreen />
                ) : step === 5 ? (
                  <ActivityScreen />
                ) : null}
              </ProfileContent>
              <NextButton />
            </>
          )}
        </AppWrapper>
      )}
    </>
  );
}

function ProfileContent({ title, note, children }) {
  return (
    <div className="flex flex-col h-[576px] items-center justify-between">
      <p className="text-center text-grey-6 font-semibold text-2xl text-wrap py-5 px-2">
        {title}
      </p>
      {children}
      <p className="text-center text-grey-4 font-normal text-xs py-6">{note}</p>
    </div>
  );
}

const titles = [
  "What is you nutritional goal",
  "What is your Sex?",
  "Your date of Birth",
  "How much do you weigh right now?",
  "What is your height?",
  "What is your activity level?",
];

const notes = [
  "Did you know? Your nutritional goal should determine what your eat and how you eat?",
  "Did you know? Your sex determines your calorie need and the amount of calorie your body is able to burn.",
  "Did you know? Your age determines your calorie need and the amount of calorie your body is able to burn.",
  "We use your weight and height and to recommend meals that suits your nutritional goal.",
  "We use your weight and height and to recommend meals that suits your nutritional goal.",
  "Your activity level is used to suggest your daily calorie and water requirement",
];
