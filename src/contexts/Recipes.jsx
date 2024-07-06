/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
export const RecipesContext = createContext();

export function RecipesProvider({ children }) {
  const [showMealDetail, setShowMealDetail] = useState(false);
  const [detail, setDetail] = useState("Calories Count");
  const [filterOptions, setFilterOptions] = useState({
    type: [],
    diet: [],
    intolerances: [],
  });
  const [showFilter, setShowFilter] = useState(false);

  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [currentMeal, setCurrentMeal] = useState({});
  const [pagination, setPagination] = useState({
    count: 0,
    currentPage: 0,
    next: "",
  });

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
        isLoading,
        setIsLoading,
        query,
        setQuery,
        currentMeal,
        setCurrentMeal,
        recipes,
        setRecipes,
        pagination,
        setPagination,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
}
