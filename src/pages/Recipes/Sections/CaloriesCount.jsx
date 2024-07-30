/* eslint-disable react/prop-types */
import { useContext } from "react";
import { CircularProgress } from "./NutrientProgress";
import { RecipesContext } from "../../../contexts/Recipes";

export function CaloriesCount() {
  const { currentMeal } = useContext(RecipesContext);

  const { CHOCDF, FAT, PROCNT } = currentMeal.totalNutrients;

  const totalCaloriesFromFat = FAT.quantity * 9;
  const totalCaloriesFromCarbs = CHOCDF.quantity * 4;
  const totalCaloriesFromProtein = PROCNT.quantity * 4;

  const totalCalories =
    totalCaloriesFromFat + totalCaloriesFromCarbs + totalCaloriesFromProtein;

  const fatPercentage = (totalCaloriesFromFat / totalCalories) * 100;
  const carbsPercentage = (totalCaloriesFromCarbs / totalCalories) * 100;
  const proteinPercentage = (totalCaloriesFromProtein / totalCalories) * 100;

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="w-full flex gap-[7px] text-grey-6 font-normal">
        <div
          className="w-[49px] h-12 border-[0.5px] flex items-center justify-center
         border-grey-4 rounded-lg"
        >
          1
        </div>
        <div
          className="pl-[16px] py-[10px] h-12 flex w-full justify-between opacity-0.5 rounded-lg
            items-center border-[0.5px] border-grey-4"
        >
          <span>{`Serving(${300}ml)`}</span>
          <p className="w-6 h-6 flex items-center justify-center">
            <img src="/angle-right.svg" alt="Recipe servings" />
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 text-base">
          <p className="text-grey-6 font-semibold">Nutrition information</p>
          <p className="text-grey-4 font-normal">1 standard serving (300ml)</p>
        </div>
        <div className="h-36 p-3 justify-between flex">
          <CircularProgress
            progress={Math.round(carbsPercentage)}
            stroke="stroke-primary-6"
            name="CARBS"
          />
          <CircularProgress
            progress={Math.round(proteinPercentage)}
            stroke="stroke-tomato-4"
            name="PROTEIN"
          />
          <CircularProgress
            progress={Math.round(fatPercentage)}
            stroke="stroke-secondary-6"
            name="FATS"
          />
        </div>
      </div>
      <MealNutrFacts />
    </div>
  );
}

export function MealNutrFacts() {
  const { currentMeal } = useContext(RecipesContext);

  const { CHOCDF, FAT, PROCNT, ENERC_KCAL } = currentMeal.totalNutrients;

  return (
    <div
      className="w-full min-h-[216px] flex flex-col justify-around items-center 
      gap-1 text-grey-6 font-montserrat text-base"
    >
      <div className="font-semibold w-full flex items-center">
        <p>Nutrition Facts</p>
      </div>
      <div
        className="w-full min-h-[188px] rounded border
         border-grey-1 bg-white-4 py-3 px-2 flex flex-col justify-between"
      >
        <Fact
          icon="energy.png"
          name="Energy"
          value={`${ENERC_KCAL.quantity.toFixed(2)}kcal`}
        />
        <Fact
          icon="carbs.png"
          name="Carbs"
          value={`${CHOCDF.quantity.toFixed(2)}g`}
        />
        <Fact
          icon="protein.png"
          name="Protein"
          value={`${PROCNT.quantity.toFixed(2)}g`}
        />
        <Fact
          icon="fats.png"
          name="Fats"
          value={`${FAT.quantity.toFixed(2)}g`}
        />
      </div>
    </div>
  );
}

export function Fact({ icon, name, value }) {
  return (
    <div
      className="w-full flex justify-between 
    items-center cursor-pointer"
    >
      <div className="flex gap-4 items-center">
        <div
          className="
        w-8 h-8 flex justify-center items-center rounded-full
         bg-white-4 shadow-[0px_0px_8px_2px_rgba(0,0,0,0.1)]"
        >
          <img src={`/${icon}`} alt={name} />
        </div>
        <p className="font-medium">{name}</p>
      </div>
      <p className="text-right">{value}</p>
    </div>
  );
}
