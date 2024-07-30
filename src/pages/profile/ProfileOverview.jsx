/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useGetQuery } from "../../hooks/useGetQuery";
import {
  loseWeightAdvice,
  gainWeightAdvice,
  maintainWeightAdvice,
} from "../../data/loseWeightAdvice";
import { useContext } from "react";
import { ProfileContext } from "../../contexts/Profile";
import { getUserProfile } from "../../services/apiAuths";
import { useQuery } from "@tanstack/react-query";
import { formatToBackendDate } from "../../utils/helpers";
import { getUserCalorie } from "../../services/apiCalorieLog";

export default function ProfileOverview() {
  const date = new Date();

  const { isLoading: isFetchingProfile, data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
  });

  const { isLoading: isFetchingCalorie, data: calorieData } = useQuery({
    queryKey: ["calorie"],
    queryFn: () => getUserCalorie(formatToBackendDate(date)),
  });
  return (
    <div
      className="items-center justify-center overflow-auto
         h-dvh pb-4 my-0 mx-auto font-montserrat
    max-w-screen-sm w-full bg-white-3"
    >
      <SectionOne />
      <Pentagon />
      <SectionTwo />
    </div>
  );
}

function SectionOne() {
  const { data } = useContext(ProfileContext);
  const { data: profileData } = useGetQuery("profile");
  const { data: calorieData } = useGetQuery("calorie");

  const { calorie } = calorieData;
  const { nutritional_goal: goal, username } = profileData.Error
    ? data
    : profileData;

  return (
    <div
      className="bg-primary-9 flex flex-col w-full
       gap-4 pt-8 items-center text-center mb-[-1px]"
    >
      <p
        className="font-semibold text-2xl
         text-secondary-5"
      >
        Welcome {username}
      </p>
      <p className="font-medium text-xl text-white-4 px-3">
        Your Profile personalization is ready
      </p>
      <div className="relative w-[210px] h-[210px]">
        <svg
          width="210"
          height="210"
          viewBox="0 0 210 210"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask id="path-1-inside-1_409_542" fill="white">
            <path d="M210 105C210 162.99 162.99 210 105 210C47.0101 210 0 162.99 0 105C0 47.0101 47.0101 0 105 0C162.99 0 210 47.0101 210 105ZM0.998795 105C0.998795 162.438 47.5617 209.001 105 209.001C162.438 209.001 209.001 162.438 209.001 105C209.001 47.5617 162.438 0.998795 105 0.998795C47.5617 0.998795 0.998795 47.5617 0.998795 105Z" />
          </mask>
          <path
            d="M210 105C210 162.99 162.99 210 105 210C47.0101 210 0 162.99 0 105C0 47.0101 47.0101 0 105 0C162.99 0 210 47.0101 210 105ZM0.998795 105C0.998795 162.438 47.5617 209.001 105 209.001C162.438 209.001 209.001 162.438 209.001 105C209.001 47.5617 162.438 0.998795 105 0.998795C47.5617 0.998795 0.998795 47.5617 0.998795 105Z"
            fill="#F5F5F5"
            stroke="#F5F5F5"
            strokeWidth="0.4"
            mask="url(#path-1-inside-1_409_542)"
          />
          <path
            d="M204 104.5C204 159.452 159.452 204 104.5 204C49.5477 204 5 159.452 5 104.5C5 49.5477 49.5477 5 104.5 5C159.452 5 204 49.5477 204 104.5ZM14.1839 104.5C14.1839 154.38 54.6198 194.816 104.5 194.816C154.38 194.816 194.816 154.38 194.816 104.5C194.816 54.6198 154.38 14.1839 104.5 14.1839C54.6198 14.1839 14.1839 54.6198 14.1839 104.5Z"
            fill="#F5F5F5"
          />
        </svg>
        <p
          className="text-wrap absolute w-40 h-28 top-[30%] left-[12%]
           font-normal text-base text-white-4 flex flex-col gap-[6px]"
        >
          <span>To {goal?.toLowerCase()}</span>
          <span>you need</span>
          <span className="block text-secondary-5 font-inter">
            <span className="text-lg font-medium">{Math.round(calorie)}</span>
            kcal
          </span>
          <span>daily</span>
        </p>
      </div>
    </div>
  );
}

export function Pentagon() {
  return (
    <svg viewBox="0 20 50 50" className="w-full h-[50px]">
      <polygon
        points={`35,70,-350,20,430,20`}
        className="fill-primary-9"
      ></polygon>
    </svg>
  );
}

function SectionTwo() {
  const { data } = useContext(ProfileContext);
  const { data: calorieData } = useGetQuery("calorie");
  const { data: profileData } = useGetQuery("profile");

  const { carbs, fats, protein } = calorieData;
  const { nutritional_goal: goal } = profileData.Error ? data : profileData;

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 px-4 pt-4">
      <div className="bg-white-4 p-[10px] rounded-[3px] flex flex-col items-center gap-6">
        <p className="text-xl text-center font-semibold text-grey-6">
          Your nutritional requirements
        </p>
        <div className="flex flex-col gap-6 items-center">
          <TwoColumnGrid
            bg="bg-primary-6"
            value={`${Math.round(0.092 * carbs)}g / ${Math.round(carbs)}g`}
            name="Carbs"
          />
          <TwoColumnGrid
            bg="bg-accent-4"
            value={`${Math.round(0.074 * protein)}g / ${Math.round(protein)}g`}
            name="Protein"
          />
          <TwoColumnGrid
            bg="bg-secondary-6"
            value={`${Math.round(0.16 * fats)}g / ${Math.round(fats)}g`}
            name="Fats"
          />
        </div>
      </div>
      <div className="bg-white-4 p-[10px] rounded-[3px] flex flex-col items-center gap-6">
        <p className="px-4 text-xl text-center font-semibold text-grey-6">
          Things that can help you {goal?.toLowerCase()}
        </p>
        <div className="flex flex-col gap-6 items-center">
          {goal?.toLowerCase().includes("lose")
            ? loseWeightAdvice.map((advice, index) => {
                return <Advice key={index} advice={advice} />;
              })
            : goal?.toLowerCase().includes("gain")
            ? gainWeightAdvice.map((advice, index) => {
                return <Advice key={index} advice={advice} />;
              })
            : goal?.toLowerCase().includes("maintain")
            ? maintainWeightAdvice.map((advice, index) => {
                return <Advice key={index} advice={advice} />;
              })
            : null}
        </div>
      </div>
      <button
        className="w-full h-12 flex items-center justify-center bg-primary-9 rounded-lg
      text-white-2 font-inter font-normal text-base cursor-pointer active:scale-95"
        onClick={() => navigate("/diary")}
      >
        Take me to diary
      </button>
    </div>
  );
}

export const TwoColumnGrid = ({ bg, name, value }) => {
  return (
    <div className="h-12 flex gap-3 text-base">
      <div className={`bg-grey-1 w-2 rounded-lg flex items-baseline`}>
        <div className={`${bg} w-full mt-auto h-1/2 rounded-lg`}></div>
      </div>
      <div className="grid grid-rows-2 gap-2">
        <p className="font-semibold text-grey-6">{name}</p>
        <p className="text-grey-4">{value}</p>
      </div>
    </div>
  );
};

function Advice({ advice }) {
  return (
    <div className="w-[95%] pb-[2px] border-b-[0.5px] border-grey-1 flex items-center gap-2">
      <img className="w-[72px] h-14" src={advice.img} alt={advice.detail} />
      <p className="font-normal text-base text-grey-4">{advice.detail}</p>
    </div>
  );
}
