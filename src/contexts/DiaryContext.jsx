/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const DiaryContext = createContext();

export function DiaryProvider({ children }) {
  const [currentId, setCurrentId] = useState(false);
  const [currentExerciseId, setCurrentExerciseId] = useState(false);
  const [isDeleteMeal, setIsDeleteMeal] = useState(false);
  const [activeID, setActiveID] = useState(null);
  const [showMealForm, setShowMealForm] = useState(false);
  const [factID, setFactId] = useState(null);
  const [isSearchMeal, setIsSearchMeal] = useState(false);
  const [meal, setMeal] = useState("");

  const navigate = useNavigate();

  function handleFooterClick(navLink, id) {
    setActiveID(id);
    navigate(navLink);
  }

  return (
    <DiaryContext.Provider
      value={{
        currentId,
        setCurrentId,
        currentExerciseId,
        setCurrentExerciseId,
        isDeleteMeal,
        setIsDeleteMeal,
        activeID,
        setActiveID,
        handleFooterClick,
        showMealForm,
        setShowMealForm,
        setFactId,
        factID,
        isSearchMeal,
        setIsSearchMeal,
        meal,
        setMeal,
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
}
