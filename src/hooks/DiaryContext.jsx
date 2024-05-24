/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const DiaryContext = createContext();

export function DiaryProvider({ children }) {
  const [currentId, setCurrentId] = useState(false);
  const [isDeleteMeal, setIsDeleteMeal] = useState(false);

  return (
    <DiaryContext.Provider
      value={{
        currentId,
        setCurrentId,
        isDeleteMeal,
        setIsDeleteMeal,
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
}
