/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
export const RecipesContext = createContext();

export function RecipesProvider({ children }) {
  const [showMealDetail, setShowMealDetail] = useState(false);
  const [detail, setDetail] = useState("Calories Count");

  return (
    <RecipesContext.Provider
      value={{
        showMealDetail,
        setShowMealDetail,
        detail,
        setDetail,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
}
