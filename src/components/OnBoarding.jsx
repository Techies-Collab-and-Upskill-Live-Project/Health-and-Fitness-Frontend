import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "./Button";
import { getUserProfile } from "../services/apiAuths";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";

const images = [
  { id: 0, name: "Group 26086143" },
  { id: 1, name: "Group 26086145" },
  { id: 2, name: "Group 26086144" },
];

function OnBoarding() {
  const [currentID, setCurrentID] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentID(currentID != 2 ? currentID + 1 : currentID);
    }, 2300);

    //Clearing the interval
    return () => clearInterval(interval);
  });

  function handleClick() {
    navigate("/sign-up");
  }

  const { isLoading: isFetchingProfile, data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
  });

  if (profileData?.status === 404) {
    navigate("/profile");
  }

  // If user already have profile, redirect to diary page
  if (profileData?.status === 200) {
    navigate("/diary");
  }

  if (isFetchingProfile) return <Spinner />;

  return (
    <div
      className="h-dvh overflow-auto px-4 pt-4 pb-7 grid gap-3.5 grid-rows-[1.5fr_1fr] 
    bg-primary-1 my-0 mx-auto max-w-screen-sm w-screen"
    >
      <div className="grid content-between mb-4">
        <img src="/Logo plain background.svg" alt="FudHouse logo" />
        {images.map(
          (image) =>
            currentID === image.id && (
              <img
                src={`/${image.name}.svg`}
                alt={`image.name`}
                key={image.id}
                className={`mx-auto transition-transform duration ${
                  currentID === 0
                    ? "animate-fadeOutImg1"
                    : currentID === 1 && "animate-fadeOutImg"
                }`}
              />
            )
        )}
      </div>
      <div className="grid items-center gap-2 w-full">
        <div className="grid justify-items-center items-center gap-6">
          <div className="grid gap-6 content-between justify-items-center p-1">
            <p
              key={currentID}
              className={`h-[81px] ${
                currentID === 0
                  ? "animate-textAnim1"
                  : currentID === 1
                  ? "animate-textAnim"
                  : "animate-lastText"
              } flex items-end text-center font-montserrat text-[#000] text-lg`}
            >
              {currentID === 0
                ? "Stay healthy as you track your food, exercise and water intake."
                : currentID === 1
                ? "Meals curated specially for you!"
                : "Plan your meals in advance while meeting your calorie and nutritional goals"}
            </p>
            <div className="flex gap-2.5">
              <div
                className={`
                inline-block w-[20px] h-1 rounded-[5px] ${
                  currentID === 0 ? "bg-tomatoCommon" : "bg-grey-1"
                }`}
              ></div>
              <div
                className={`
                transition-colors duration-700 cubic-bezier(.47,.45,.6,.27)
                inline-block w-[20px] h-1 rounded-[5px] ${
                  currentID === 1 ? "bg-tomatoCommon" : "bg-grey-1"
                }`}
              ></div>
              <div
                className={`
                transition-colors duration-700 cubic-bezier(.47,.45,.6,.27)
                inline-block w-[20px] h-1 rounded-[5px] ${
                  currentID === 2 ? "bg-tomatoCommon" : "bg-grey-1"
                }`}
              ></div>
            </div>
          </div>
          <Button
            width="w-full"
            handleClick={handleClick}
            bgColor={"bg-primary-9"}
          >
            Get started
          </Button>
        </div>
        <p className="text-base font-normal font-montserrat text-[#131313] text-center">
          Already have an account?<span> </span>
          <a href="/log-in" className="text-tomatoCommon">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default OnBoarding;
