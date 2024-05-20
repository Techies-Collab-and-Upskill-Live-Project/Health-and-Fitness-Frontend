/* eslint-disable react/prop-types */
import { useState } from "react";

import { CircularProgress } from "../../components/CircularProgressBar";
import { PlainLogo } from "../../components/PlainLogo";
import { formatDate } from "../../utils/helpers";
import { DateNavigation } from "./DateNavigation";

export default function CalorieLog() {
  const [step, setStep] = useState(0);
  const date = new Date();
  date.setDate(date.getDate() + step);
  const formattedDate = formatDate(date);
  function handleIncStep() {
    setStep(() => step + 1);
  }
  function handleDecStep() {
    setStep(() => step - 1);
  }
  return (
    <div className="bg-primary-9 p-4 flex-col flex items-center text-white-3 gap-5 pb-16">
      <PlainLogo />
      <Title />
      <DateNavigation
        formattedDate={formattedDate}
        onDecStep={handleDecStep}
        onIncStep={handleIncStep}
      />
      <CircularProgress progress={10} />
      <NutritionalRequirements />
    </div>
  );
}

export function Title() {
  return <p className="text-xl font-semibold">Diary</p>;
}

export function NutritionalRequirements() {
  return (
    <div className="flex justify-between items-center w-full sm:px-20">
      <TwoColumnGrid bg="bg-primary-6" name="Carb" value="35g / 380g" />
      <TwoColumnGrid bg="bg-accent-4" name="Protein" value="35g / 380g" />
      <TwoColumnGrid bg="bg-secondary-6" name="Fats" value="35g / 380g" />
    </div>
  );
}

const TwoColumnGrid = ({ bg, name, value }) => {
  return (
    <div className="h-12 flex gap-3">
      <div className={`bg-white-4 w-2 rounded-lg flex items-baseline`}>
        <div className={`${bg} w-full mt-auto h-1/2 rounded-lg`}></div>
      </div>
      <div className="flex-1 grid grid-rows-2 gap-2">
        <p className="text-base font-medium">{name}</p>
        <p className="text-sm">{value}</p>
      </div>
    </div>
  );
};
