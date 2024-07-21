/* eslint-disable react/prop-types */
import { useContext } from "react";

import AppWrapper from "../../components/AppWrapper";
import { ProfileContext, ProfileProvider } from "../../contexts/Profile";
import { NavBar, ProfileNav } from "./Nav";
import { NextButton } from "./NextButton";
import { GoalSwitcher } from "./ProfileNutritionalGoal";

export default function Profile() {
  return (
    <ProfileProvider>
      <ProfilePage />
    </ProfileProvider>
  );
}

function ProfilePage() {
  const { step } = useContext(ProfileContext);

  return (
    <AppWrapper>
      <img
        className="h-[17px]"
        src="/Logo plain background.svg"
        alt="FudHouse logo"
      />
      {step > 0 && <NavBar />}
      <ProfileNav />
      <ProfileContent title={titles[step]} note={notes[step]}>
        <GoalSwitcher />
      </ProfileContent>
      <NextButton />
    </AppWrapper>
  );
}

function ProfileContent({ title, note, children }) {
  return (
    <div className="flex flex-col h-[576px] items-center justify-between">
      <p className="text-grey-6 font-semibold text-2xl text-wrap py-5">
        {title}
      </p>
      {children}
      <p className="text-grey-4 font-normal text-xs py-6">{note}</p>
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
