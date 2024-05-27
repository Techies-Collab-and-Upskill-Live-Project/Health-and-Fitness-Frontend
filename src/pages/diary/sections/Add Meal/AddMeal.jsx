/* eslint-disable react/prop-types */
import TopNavBar from "../../TopNavBar";

import { DiaryProvider } from "../../../../contexts/DiaryContext";
import { MainWrapper } from "../../MainWrapper";
import { SearchMeal } from "../MealSearchBar";
import { MealManualInput } from "./MealManualInput";
import { MealNutrFacts } from "./NutritionFacts";
import { SaveBtn } from "./SaveBtn";

export default function AddMeal() {
  return (
    <DiaryProvider>
      <MainWrapper id={1}>
        <TopNavBar
          bg="primary-9"
          iconFill="white-3"
          iconStroke="grey-6"
          text="Meals"
          textColor="white-3"
        />
        <div
          className="w-full min-h-[650px] h-full px-4 flex flex-col
        justify-around items-center"
        >
          <SearchMeal />
          <MealManualInput />
          <MealNutrFacts />
          <SaveBtn />
        </div>
      </MainWrapper>
    </DiaryProvider>
  );
}
