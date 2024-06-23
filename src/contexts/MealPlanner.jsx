/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { formatToBackendDate, getWeekNumber } from "../utils/helpers";

export const MealPlannerContext = createContext();

export function MealPlannerProvider({ children }) {
  // Get the current date
  const [currentDate, setCurrentDate] = useState(new Date());

  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  // Calculate the ISO week number
  const weekNumber = getWeekNumber(startOfWeek);

  const startDay = startOfWeek.toLocaleDateString("en-US", {
    day: "numeric",
  });

  const endDay = endOfWeek.toLocaleDateString("en-US", {
    day: "numeric",
  });

  const month = endOfWeek.toLocaleDateString("en-US", {
    month: "short",
  });

  const year = currentDate.getFullYear();

  const weekRange = `${startDay}-${endDay} ${month}, ${year}`;

  const backendDateRange = `${formatToBackendDate(
    startOfWeek
  )}, ${formatToBackendDate(endOfWeek)}`;

  // Function to increment or decrement the week
  const changeWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    setCurrentDate(newDate);
  };

  const [plannedMealCurrentId, setPlannedMealCurrentId] = useState(null);

  return (
    <MealPlannerContext.Provider
      value={{
        weekNumber,
        changeWeek,
        weekRange,
        year,
        backendDateRange,
        plannedMealCurrentId,
        setPlannedMealCurrentId,
      }}
    >
      {children}
    </MealPlannerContext.Provider>
  );
}
