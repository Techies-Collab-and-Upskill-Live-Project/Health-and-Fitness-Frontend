/* eslint-disable react/prop-types */
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { CircularProgress } from "../../components/CircularProgressBar";
import { PlainLogo } from "../../components/PlainLogo";
import { formatDate, formatToBackendDate, roundUp } from "../../utils/helpers";
import { DateNavigation } from "./DateNavigation";
import { getUserCalorie } from "../../services/apiCalorieLog";
import { useGetQuery } from "../../hooks/useGetQuery";
import Spinner from "../../components/Spinner";


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

  const { isLoading, data: calorie } = useQuery({
    queryKey: ["calorie"],
    queryFn: () => getUserCalorie(formatToBackendDate(date)),
  });

  if (isLoading) return <Spinner />;

  return (
    <div
      className="
    bg-primary-9 p-4 flex-col flex items-center
     text-white-3 gap-3 pb-12 mb-[-1px] mr-[-1px]"
    >
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
  const data = useGetQuery("calorie");
  const { carbs, fats, protein } = data;

  return (
    <div className="flex justify-between items-center w-full sm:px-20">
      <TwoColumnGrid
        bg="bg-primary-6"
        name="Carb"
        value={`35g / ${roundUp(carbs)}g`}
      />
      <TwoColumnGrid
        bg="bg-accent-4"
        name="Protein"
        value={`35g / ${roundUp(protein)}g`}
      />
      <TwoColumnGrid
        bg="bg-secondary-6"
        name="Fats"
        value={`35g / ${roundUp(fats)}g`}
      />
    </div>
  );
}

const TwoColumnGrid = ({ bg, name, value }) => {
  return (
    <div className="h-12 flex gap-3">
      <div className={`bg-white-4 w-2 rounded-lg flex items-baseline`}>
        <div className={`${bg} w-full mt-auto h-1/2 rounded-lg`}></div>
      </div>
      <div className="grid grid-rows-2 gap-2">
        <p className="text-base font-medium">{name}</p>
        <p className="text-sm">{value}</p>
      </div>
    </div>
  );
};
