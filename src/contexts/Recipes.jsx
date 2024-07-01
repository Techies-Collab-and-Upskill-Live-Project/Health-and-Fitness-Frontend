/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
export const RecipesContext = createContext();

export function RecipesProvider({ children }) {
  const [showMealDetail, setShowMealDetail] = useState(false);

  return (
    <RecipesContext.Provider
      value={{
        showMealDetail,
        setShowMealDetail,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
}
