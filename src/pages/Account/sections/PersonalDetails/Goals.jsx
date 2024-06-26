/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AccountContext } from "../../../../contexts/Account";

export function Goals() {
  return (
    <div
      className="flex flex-col w-full gap-3
    font-semibold text-[19px] leading-[27px]"
    >
      <p className="">I want to</p>
      <div className="flex flex-col gap-4">
        <SingleGoal goal="Maintain weight" />
        <SingleGoal goal="Lose weight" />
        <SingleGoal goal="Gain weight" />
      </div>
    </div>
  );
}

function SingleGoal({ goal }) {
  const { selectedGoal, setSelectedGoal } = useContext(AccountContext);
  return (
    <div
      onClick={() => {
        setSelectedGoal(goal.toLowerCase());
      }}
      className="text-sm font-semibold text-black 
    flex w-full justify-between items-center cursor-pointer"
    >
      <span>{goal}</span>
      <div
        className={`flex items-center justify-center w-5 h-5 
          rounded-full border-2 ${
            selectedGoal === goal.toLowerCase()
              ? "border-primary-8"
              : "border-grey-5"
          }`}
      >
        {selectedGoal === goal.toLowerCase() && (
          <div className="w-3 h-3 bg-primary-9 rounded-full"></div>
        )}
      </div>
    </div>
  );
}
