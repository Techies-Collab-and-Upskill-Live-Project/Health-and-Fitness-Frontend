/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { formatToBackendDate, getWeekNumber } from "../utils/helpers";

export const MealPlannerContext = createContext();

export function MealPlannerProvider({ children }) {
  // Get the current date
  const [currentDate, setCurrentDate] = useState(new Date());

  // Find the start date of the current week (Monday)
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);

  // Calculate the end date of the current week (Sunday)
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
  
  const weekRange = `${startDay} - ${endDay} ${month}, ${year}`;

  const backendDateRange = `${formatToBackendDate(
    startOfWeek
  )} -${formatToBackendDate(endOfWeek)}`;

  // Function to increment or decrement the week
  const changeWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    setCurrentDate(newDate);
  };

  return (
    <MealPlannerContext.Provider
      value={{ weekNumber, changeWeek, weekRange, year, backendDateRange }}
    >
      {children}
    </MealPlannerContext.Provider>
  );
}
