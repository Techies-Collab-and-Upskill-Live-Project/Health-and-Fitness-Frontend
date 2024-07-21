/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Button } from "../../components/Button";
import { ProfileContext } from "../../contexts/Profile";

export function GoalSwitcher() {
  const { profile, setProfile } = useContext(ProfileContext);

  return (
    <div className="w-11/12 h-3/6  justify-center flex flex-col pl-4 ">
      <div className="pb-2">
        <Button
          width="w-full"
          height="h-12"
          border={
            profile.weight !== "Lose weight" ? "border border-grey-1" : ""
          }
          handleClick={() =>
            setProfile((prev) => ({
              ...prev,
              weight: "Lose weight",
            }))
          }
          bgColor={`transition duration-300 ${
            profile.weight === "Lose weight" ? "bg-primary-9" : "bg-white-3"
          }`}
        >
          <p
            className={
              profile.weight === "Lose weight" ? "text-white-4" : "text-grey-4"
            }
          >
            Lose Weight
          </p>
        </Button>
      </div>
      <div className="pb-2">
        <Button
          width="w-full"
          height="h-12"
          border={
            profile.weight !== "Gain weight" ? "border border-grey-1" : ""
          }
          handleClick={() =>
            setProfile((prev) => ({
              ...prev,
              weight: "Gain weight",
            }))
          }
          bgColor={`transition duration-300 ${
            profile.weight === "Gain weight" ? "bg-primary-9" : "bg-white-3"
          }`}
        >
          {" "}
          <p
            className={
              profile.weight === "Gain weight" ? "text-white-4" : "text-grey-4"
            }
          >
            Gain Weight
          </p>
        </Button>
      </div>
      <div className="pb-2">
        <Button
          width="w-full"
          height="h-12"
          border={
            profile.weight !== "Maintain weight" ? "border border-grey-1" : ""
          }
          handleClick={() =>
            setProfile((prev) => ({
              ...prev,
              weight: "Maintain weight",
            }))
          }
          bgColor={`transition duration-300 ${
            profile.weight === "Maintain weight" ? "bg-primary-9" : "bg-white-3"
          }`}
        >
          {" "}
          <p
            className={
              profile.weight === "Maintain weight"
                ? "text-white-4"
                : "text-grey-4"
            }
          >
            Maintain weight
          </p>
        </Button>
      </div>
    </div>
  );
}
