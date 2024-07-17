/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useContext, useEffect, useState } from "react";

import TopNavBar from "../../TopNavBar";

import { useSearchMeal } from "../../../../hooks/useRecipes";
import { DiaryContext } from "../../../../contexts/DiaryContext";
import { MainWrapper } from "../../MainWrapper";
import { SearchMeal } from "../MealSearchBar";
import { MealManualInput } from "./MealManualInput";
import { MealNutrFacts } from "./NutritionFacts";
import { SaveBtn } from "./SaveBtn";
import { useGetQuery } from "../../../../hooks/useGetQuery";

export default function AddMeal() {
  return (
    <MainWrapper id={1}>
      <TopNavBar
        bg="primary-9"
        iconFill="white-3"
        iconStroke="grey-6"
        text="Meals"
        textColor="white-3"
      />
      <AddMealContent />
    </MainWrapper>
  );
}

function AddMealContent() {
  const { isSearchMeal } = useContext(DiaryContext);
  return (
    <div
      className={`w-full flex flex-col
        ${
          isSearchMeal
            ? "gap-2 h-[calc(100dvh_-_95px)] bg-white-4"
            : "px-4 justify-around h-custom-dvh"
        } items-center`}
    >
      {isSearchMeal ? (
        <>
          <MealSearchOptions />
          <FoundMeals />
        </>
      ) : (
        <>
          <SearchMeal />
          <MealManualInput />
          <MealNutrFacts />
          <SaveBtn />
        </>
      )}
    </div>
  );
}

export function MealSearchOptions() {
  return (
    <div className="w-full bg-white-4 pb-2 pt-6 pl-3 pr-4 shadow-[2px_2px_20px_0px_#00000026]">
      <SearchMeal />
    </div>
  );
}

function FoundMeals() {
  const [meals, setMeals] = useState([]);

  const { data: mealData, status: mealStatus } = useGetQuery("meals");

  const { meal } = useContext(DiaryContext);
  const { recipes } = useSearchMeal(meal);

  useEffect(() => {
    if (recipes.length === 0 && mealStatus === 404) {
      setMeals([]);
    } else if (recipes.length === 0) {
      const filteredUserDiaryMeals = filterUserDiaryMeals(mealData, meal);
      setMeals(filteredUserDiaryMeals);
    } else if (mealStatus === 404) {
      setMeals(recipes);
    } else {
      const filteredUserDiaryMeals = filterUserDiaryMeals(mealData, meal);
      const filteredApiMeals = filterMeals(filteredUserDiaryMeals, recipes);
      const combinedMeals = [...filteredUserDiaryMeals, ...filteredApiMeals];

      setMeals(combinedMeals);
    }
  }, [recipes, meal, mealData, mealStatus]);

  return (
    <div className="w-full p-3 overflow-auto text-grey-6 flex flex-col gap-1">
      {meals.map((meal, index) => {
        console.log(meal);
        const id = meal.id ? meal.id : index;
        return (
          <MealOption
            key={id}
            name={meal.name}
            id={id}
            servings={meal.servings}
            energy={meal.energy}
            selected={meal.date ? true : false}
            img={meal.image_url}
          />
        );
      })}
    </div>
  );
}

function MealOption({ name, id, servings, energy, selected, img }) {
  console.log(selected);
  return (
    <div className="w-full flex gap-2 border p-1 rounded border-grey-1">
      <img
        src={img ? img : "/mealPlaceholder.png"}
        alt={name}
        className="rounded w-16 h-[69px]"
      />
      <div className="flex w-full flex-col justify-around items-center">
        <p className="font-semibold text-[13px] leading-5">{name}</p>
        <div className="flex items-center gap-3">
          <p className="flex items-center gap-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 14.1666C10.6819 14.1666 13.6667 11.1818 13.6667 7.49992C13.6667 3.81802 10.6819 0.833252 7 0.833252C3.3181 0.833252 0.333336 3.81802 0.333336 7.49992C0.333336 11.1818 3.3181 14.1666 7 14.1666ZM5 6.99992C4.72386 6.99992 4.5 7.22378 4.5 7.49992C4.5 7.77606 4.72386 7.99992 5 7.99992H9C9.27614 7.99992 9.5 7.77606 9.5 7.49992C9.5 7.22378 9.27614 6.99992 9 6.99992H5Z"
                fill="#548D16"
              />
            </svg>

            <span>
              {servings} serving ({servings * 300} ml)
            </span>

            <svg
              width="16"
              height="16"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.333334 7.49992C0.333334 11.1818 3.3181 14.1666 7 14.1666C10.6819 14.1666 13.6667 11.1818 13.6667 7.49992C13.6667 3.81802 10.6819 0.833252 7 0.833252C3.3181 0.833252 0.333334 3.81802 0.333334 7.49992ZM9 7.99992C9.27614 7.99992 9.5 7.77606 9.5 7.49992C9.5 7.22378 9.27614 6.99992 9 6.99992H7.5V5.49992C7.5 5.22378 7.27614 4.99992 7 4.99992C6.72386 4.99992 6.5 5.22378 6.5 5.49992V6.99992L5 6.99992C4.72386 6.99992 4.5 7.22378 4.5 7.49992C4.5 7.77606 4.72386 7.99992 5 7.99992L6.5 7.99992L6.5 9.49992C6.5 9.77606 6.72386 9.99992 7 9.99992C7.27614 9.99992 7.5 9.77606 7.5 9.49992L7.5 7.99992H9Z"
                fill="#548D16"
              />
            </svg>
          </p>
          <span>{Math.round(energy)}kcal</span>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <img src="/PlusBtn.svg" alt="Select Meal" className="cursor-pointer" />
      </div>
    </div>
  );
}

function filterUserDiaryMeals(userDiaryMeals, keyword) {
  const lowerKeyword = keyword.toLowerCase();

  return userDiaryMeals.filter((meal) =>
    meal.name.toLowerCase().includes(lowerKeyword)
  );
}

function filterMeals(userDiaryMeals, apiMeals) {
  const diaryMealNames = userDiaryMeals.map((meal) => meal.name.toLowerCase());

  return apiMeals.filter(
    (meal) => !diaryMealNames.includes(meal.name.toLowerCase())
  );
}
