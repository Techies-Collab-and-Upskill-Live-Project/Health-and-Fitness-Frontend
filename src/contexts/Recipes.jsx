/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
export const RecipesContext = createContext();

export function RecipesProvider({ children }) {
  const [showMealDetail, setShowMealDetail] = useState(false);
  const [detail, setDetail] = useState("Calories Count");
  const [filterOptions, setFilterOptions] = useState({
    type: "All",
    diet: [],
    intolerances: [],
  });
  const [showFilter, setShowFilter] = useState(false);

  return (
    <RecipesContext.Provider
      value={{
        showMealDetail,
        setShowMealDetail,
        detail,
        setDetail,
        filterOptions,
        setFilterOptions,
        showFilter,
        setShowFilter,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
}
