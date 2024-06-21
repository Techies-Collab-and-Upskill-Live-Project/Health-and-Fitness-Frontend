/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { Pentagon } from "../../components/Pentagon";
import { DiaryProvider } from "../../contexts/DiaryContext";
import {
  MealPlannerContext,
  MealPlannerProvider,
} from "../../contexts/MealPlanner";
import { MainWrapper } from "../diary/MainWrapper";
import MainSection from "./MainSection";
import Navigation from "./Navigation";
import Spinner from "../../components/Spinner";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getUserPlannedMeals } from "../../services/apiMealPlanner";
import { useNavigate } from "react-router-dom";

export default function MealPlanner() {
  return (
    <DiaryProvider>
      <MealPlannerProvider>
        <MealPlannerPage />
      </MealPlannerProvider>
    </DiaryProvider>
  );
}

export function MealPlannerPage() {
  const navigate = useNavigate();
  const { weekRange, backendDateRange } = useContext(MealPlannerContext);

  const queryClient = useQueryClient();

  useEffect(() => {
    // Define an array of query keys to be removed
    const queryKeys = ["plannedMeals"];

    // Iterate over the array and remove each query
    queryKeys.forEach((key) => {
      queryClient.removeQueries({
        queryKey: [key],
      });
    });
  }, [weekRange, queryClient]);

  const { isLoading: isFetchingPlannedMeals, data: PlannedMealData } = useQuery(
    {
      queryKey: ["plannedMeals"],
      queryFn: () => getUserPlannedMeals(backendDateRange),
    }
  );

  // If user is logged out, redirect to log in page
  if (PlannedMealData?.status === 401) {
    navigate("/log-in");
  }

  if (isFetchingPlannedMeals) return <Spinner />;

  return (
    <MainWrapper id={3}>
      <Navigation />
      <Pentagon type="planner" />
      <MainSection />
    </MainWrapper>
  );
}
