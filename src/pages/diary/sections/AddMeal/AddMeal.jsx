/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useContext, useEffect, useState } from "react";

import TopNavBar from "../../TopNavBar";
import Spinner from "../../../../components/Spinner";

import { useSearchMeal } from "../../../../hooks/useRecipes";
import { DiaryContext } from "../../../../contexts/DiaryContext";
import { MainWrapper } from "../../MainWrapper";
import { SearchMeal } from "../MealSearchBar";
import { MealManualInput } from "./MealManualInput";
import { MealNutrFacts } from "./NutritionFacts";
import { SaveBtn } from "./SaveBtn";
import { useGetQuery } from "../../../../hooks/useGetQuery";
import { formatToBackendDate } from "../../../../utils/helpers";
import { createUserMeal, updateUserMeal } from "../../../../services/apiMeal";
import { useCustomMutation } from "../../../../hooks/useCustomMutation";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ScreenOverlay from "../../../../components/ScreenOverlay";
import { InlineSpinner } from "../../../../components/InlineSpinner";
import { loadMore } from "../../../../services/apiRecipe";
import { Button } from "../../../../components/Button";

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

  const {
    meal,
    isLoading,
    setRecipes,
    pagination,
    setPagination,
    setIsLoadingMore,
    isLoadingMore,
  } = useContext(DiaryContext);
  const { recipes } = useSearchMeal(meal);

  function handleClick() {
    loadMore(pagination.next, setRecipes, setIsLoadingMore, setPagination);
  }

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
    <>
      {isLoading ? (
        <InlineSpinner />
      ) : (
        <div className="w-full p-3 overflow-auto text-grey-6 flex flex-col gap-1">
          {meals.map((meal, index) => {
            const id = meal.id ? meal.id : index;
            return (
              <MealOption
                key={id}
                name={meal.name}
                id={id}
                servings={meal.servings}
                energy={Math.round(meal.energy)}
                carbs={Math.round(meal.carbs)}
                protein={Math.round(meal.protein)}
                fats={Math.round(meal.fats)}
                selected={meal.date ? true : false}
                img={meal.image_url}
              />
            );
          })}
          <div className="h-full m-auto">
            {pagination.count > pagination.currentPage && !isLoading && (
              <Button
                handleClick={handleClick}
                bgColor={isLoadingMore ? "bg-grey-2" : "bg-primary-9"}
                isValid={!isLoadingMore}
              >
                {isLoadingMore ? <InlineSpinner /> : "Load more"}
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function MealOption({
  name,
  id,
  servings,
  energy,
  carbs,
  protein,
  fats,
  selected,
  img,
}) {
  const [newServings, setNewServings] = useState(servings);

  const { step } = useContext(DiaryContext);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const date = new Date();
  date.setDate(date.getDate() + step);

  function onClick() {
    mutate({
      date: formatToBackendDate(date),
      name: name,
      image_url: img ? img : null,
      energy: (energy * newServings).toFixed(2),
      servings: newServings,
      carbs: (carbs * newServings).toFixed(2),
      fats: (fats * newServings).toFixed(2),
      protein: (protein * newServings).toFixed(2),
    });
  }

  const { mutate, status } = useCustomMutation(
    createUserMeal,
    async (data) => {
      /** If user's credentials are correct **/
      if (data.status == 201) {
        queryClient.invalidateQueries({
          queryKey: ["meals"],
        });
        toast.success("Successfully added meal");
      } else if (data.status == 401) {
        /** If user's credentials are not correct **/
        navigate("/log-in");
      } else if (data.status == 400) {
        /** If user does not provide one or more fields **/
        Object.entries(data.data).forEach(([fieldName, errorMessages]) => {
          try {
            errorMessages.forEach((errorMessage) => {
              toast.error(`${fieldName}: ${errorMessage}`); //Make toast
            });
          } catch {
            toast.error(`${errorMessages}`);
          }
        });
      }
    },
    (err) => toast.error(err.message)
  );

  const { mutate: updateServings, status: updateServingsStatus } =
    useCustomMutation(
      updateUserMeal,
      async (data) => {
        /** If user's credentials are correct **/
        if (data.status == 200) {
          queryClient.invalidateQueries({
            queryKey: ["meals"],
          });

          setNewServings((servings) =>
            data.data.servings > servings ? servings + 1 : servings - 1
          );
        } else if (data.status == 401) {
          /** If user's credentials are not correct **/
          navigate("/log-in");
        } else if (data.status == 400) {
          /** If user does not provide one or more fields **/
          Object.entries(data.data).forEach(([fieldName, errorMessages]) => {
            try {
              errorMessages.forEach((errorMessage) => {
                toast.error(`${fieldName}: ${errorMessage}`); //Make toast
              });
            } catch {
              toast.error(`${errorMessages}`);
            }
          });
        }
      },
      (err) => toast.error(err.message)
    );

  function handleChangeServings(action) {
    if (selected) {
      const change = action === "inc" ? newServings + 1 : newServings - 1;

      if (action === "dec" && newServings === 1) return;

      updateServings({
        date: formatToBackendDate(date),
        name,
        servings: change,
        energy:
          action === "inc"
            ? energy / newServings + energy
            : energy - energy / newServings,
        carbs:
          action === "inc"
            ? carbs / newServings + carbs
            : carbs - carbs / newServings,
        protein:
          action === "inc"
            ? protein / newServings + protein
            : protein - protein / newServings,
        fats:
          action === "inc"
            ? fats / newServings + fats
            : fats - fats / newServings,
      });
    } else {
      setNewServings((servings) =>
        action === "inc" ? servings + 1 : servings > 1 ? servings - 1 : servings
      );
    }
  }

  return (
    <div
      className={`${
        selected && "bg-primary-1"
      } w-full flex gap-2 border p-1 rounded border-grey-1`}
    >
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
              onClick={() => handleChangeServings("dec")}
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
              {newServings} serving ({newServings * 300} ml)
            </span>

            <svg
              onClick={() => handleChangeServings("inc")}
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
          <span>
            {selected ? energy : energy * newServings}
            kcal
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center">
        {selected ? (
          <svg
            width="12"
            height="9"
            viewBox="0 0 12 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.7174 1.48685C11.8942 1.27471 11.8655 0.959432 11.6534 0.78265C11.4413 0.605868 11.126 0.63453 10.9492 0.846668L7.35541 5.15921C6.63352 6.02548 6.1257 6.63299 5.68523 7.03073C5.25504 7.4192 4.95815 7.54266 4.66664 7.54266C4.37513 7.54266 4.07824 7.4192 3.64805 7.03073C3.20758 6.63298 2.69976 6.02548 1.97786 5.15921L1.05075 4.04667C0.873967 3.83453 0.558685 3.80587 0.346546 3.98265C0.134408 4.15943 0.105746 4.47471 0.282528 4.68685L1.23537 5.83027C1.92555 6.65851 2.47828 7.32179 2.97785 7.77291C3.49389 8.2389 4.0214 8.54266 4.66664 8.54266C5.31188 8.54266 5.83939 8.2389 6.35543 7.77291C6.85499 7.3218 7.40771 6.65852 8.09788 5.83029L11.7174 1.48685Z"
              fill="#63626E"
            />
          </svg>
        ) : (
          <img
            onClick={onClick}
            src="/PlusBtn.svg"
            alt="Select Meal"
            className="cursor-pointer"
          />
        )}
      </div>
      {status === "pending" && (
        <ScreenOverlay>
          <Spinner />
        </ScreenOverlay>
      )}
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
