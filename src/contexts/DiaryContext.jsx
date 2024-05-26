/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const DiaryContext = createContext();

export function DiaryProvider({ children }) {
  const [currentId, setCurrentId] = useState(false);
  const [isDeleteMeal, setIsDeleteMeal] = useState(false);
  const [activeID, setActiveID] = useState(null);
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
        isDeleteMeal,
        setIsDeleteMeal,
        activeID,
        setActiveID,
        handleFooterClick,
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
}
