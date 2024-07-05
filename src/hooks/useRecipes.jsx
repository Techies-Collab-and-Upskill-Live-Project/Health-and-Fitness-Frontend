import { useContext, useEffect, useState } from "react";
import { RecipesContext } from "../contexts/Recipes";
import toast from "react-hot-toast";

const KEY = import.meta.env.VITE_KEY;
const ID = import.meta.env.VITE_APP_ID;

export function useRecipes(query) {
  const [recipes, setRecipes] = useState([]);
  const { filterOptions, setIsLoading } = useContext(RecipesContext);

  const { diet, intolerances, type } = filterOptions;
  const mealType = type.name !== "All" ? `&type=${type.name}` : "";

  const userDiet =
    diet.length !== 0 ? `&diet=${diet.join(",").toLowerCase()}` : "";

  const userAllergy =
    intolerances.length !== 0
      ? `&intolerances=${intolerances.join(",").toLowerCase()}`
      : "";

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        setIsLoading(true);
        try {
          const res = await fetch(
            `https://api.edamam.com/api/recipes/v2?q=${query}&app_id=${ID}&app_key=${KEY}&type=any&field=uri&field=label&field=image&field=ingredients&field=totalNutrients&field=ingredientLines`,
            { signal: controller.signal }
          );

          setIsLoading(false);
          if (!res.ok)
            throw new Error(
              "Something went wrong with fetching recipes, try back later"
            );

          const data = await res.json();

          if (data.count === 0) throw new Error("recipe not found");

          setRecipes(data.hits);
        } catch (err) {
          if (err.name !== "AbortError") toast.error(err.message);
        }
      }

      if (query.length < 3) {
        setRecipes([]);
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query, mealType, userAllergy, userDiet, setIsLoading]
  );

  return { recipes };
}
