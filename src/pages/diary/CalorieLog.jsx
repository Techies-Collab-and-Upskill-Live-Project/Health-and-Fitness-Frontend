/* eslint-disable react/prop-types */
import { CircularProgress } from "../../components/CircularProgressBar";
import { PlainLogo } from "../../components/PlainLogo";
import { reduceObjectsAttr, roundUp } from "../../utils/helpers";
import { DateNavigation } from "./DateNavigation";
import { useGetQuery } from "../../hooks/useGetQuery";

export default function CalorieLog({ step, setStep, formattedDate }) {
  function handleIncStep() {
    setStep(() => step + 1);
  }

  function handleDecStep() {
    setStep(() => step - 1);
  }

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
      <CircularProgress />
      <NutritionalRequirements />
    </div>
  );
}

export function Title() {
  return <p className="text-xl font-semibold">Diary</p>;
}

export function NutritionalRequirements() {
  const { data: calorieData } = useGetQuery("calorie");
  const { data: mealData, status: mealStatus } = useGetQuery("meals");

  const { carbs, fats, protein } = calorieData;

  const totalCarbs =
    mealStatus === 404 ? 0 : reduceObjectsAttr(mealData, "carbs");
  const totalFats =
    mealStatus === 404 ? 0 : reduceObjectsAttr(mealData, "fats");
  const totalProtein =
    mealStatus === 404 ? 0 : reduceObjectsAttr(mealData, "protein");

  return (
    <div className="flex justify-between items-center w-full sm:px-20">
      <TwoColumnGrid
        bg="bg-primary-6"
        name="Carb"
        value={`${totalCarbs}g / ${roundUp(carbs)}g`}
      />
      <TwoColumnGrid
        bg="bg-accent-4"
        name="Protein"
        value={`${totalProtein}g / ${roundUp(protein)}g`}
      />
      <TwoColumnGrid
        bg="bg-secondary-6"
        name="Fats"
        value={`${totalFats}g / ${roundUp(fats)}g`}
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
