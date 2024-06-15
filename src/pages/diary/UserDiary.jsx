/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { DiaryProvider } from "../../contexts/DiaryContext";
import { formatDate, formatToBackendDate } from "../../utils/helpers";
import { getUserCalorie } from "../../services/apiCalorieLog";
import { getUserMeal } from "../../services/apiMeal";

import CalorieLog from "./CalorieLog";
import SectionTwo from "./SectionTwo";
import Spinner from "../../components/Spinner";

import { Pentagon } from "../../components/Pentagon";
import { Pill } from "../../components/Pill";
import { MainWrapper } from "./MainWrapper";
import { getUserExercise } from "../../services/apiExercise";
export default function Diary() {
  const navigate = useNavigate();

  const access = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");
  useEffect(() => {
    if (access === null || refresh === null) {
      navigate("/log-in");
    }
  }, [navigate, access, refresh]);

  const [step, setStep] = useState(0);
  const date = new Date();
  date.setDate(date.getDate() + step);
  const formattedDate = formatDate(date);

  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.removeQueries({
      queryKey: ["meals"],
    });
  }, [step, queryClient]);

  const { isLoading: isFetchingCalorie } = useQuery({
    queryKey: ["calorie"],
    queryFn: () => getUserCalorie(formatToBackendDate(date)),
  });

  const { isLoading: isFetchingMeal } = useQuery({
    queryKey: ["meals"],
    queryFn: () => getUserMeal(formatToBackendDate(date)),
  });
  
  const { isLoading: isFetchingExercise } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => getUserExercise(formatToBackendDate(date)),
  });

  if (access === null || refresh === null) {
    return null;
  }
  if (isFetchingCalorie || isFetchingMeal || isFetchingExercise) return <Spinner />;

  return (
    <DiaryProvider>
      <MainWrapper id={1}>
        <CalorieLog
          step={step}
          setStep={setStep}
          formattedDate={formattedDate}
        />
        <Pentagon />
        <Pill />
        <SectionTwo />
      </MainWrapper>
    </DiaryProvider>
  );
}
