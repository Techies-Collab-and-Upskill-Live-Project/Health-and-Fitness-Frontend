import { useContext, useEffect, useState } from "react";
import { RecipesContext } from "../contexts/Recipes";
import toast from "react-hot-toast";

const KEY = import.meta.env.VITE_KEY;
const ID = import.meta.env.VITE_APP_ID;

export function useRecipes(query) {
  const [recipes, setRecipes] = useState([]);
  const { filterOptions, setIsLoading, setPagination } =
    useContext(RecipesContext);

  const { diet, intolerances, type } = filterOptions;

  const mealType =
    type.length !== 0
      ? type.includes("All")
        ? ""
        : `${type
            .map((item) => {
              return `&dishType=${item.toLowerCase().replace(/\s+/g, "-")}`;
            })
            .join("")}`
      : "";

  const userDiet =
    diet.length !== 0
      ? `${diet
          .map((item) => {
            return `&health=${item.toLowerCase()}`;
          })
          .join("")}`
      : "";

  const userAllergy =
    intolerances.length !== 0
      ? `${intolerances
          .map((item) => {
            return `&health=${item.toLowerCase().replace(/\s+/g, "-")}-free`;
          })
          .join("")}`
      : "";

  let health = "";
  if (userAllergy !== "" && userDiet !== "") {
    health = `${userDiet},${userAllergy}`;
  } else if (userDiet !== "") {
    health = userDiet;
  } else if (userAllergy !== "") {
    health = userAllergy;
  }

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        setIsLoading(true);
        try {
          const res = await fetch(
            `https://api.edamam.com/api/recipes/v2?q=${query}&app_id=${ID}&app_key=${KEY}&type=any&field=uri&field=label&field=image&field=ingredients&field=totalNutrients&field=ingredientLines${health}${mealType}`,
            { signal: controller.signal }
          );

          setIsLoading(false);
          if (!res.ok)
            throw new Error(
              "Something went wrong with fetching recipes, try back later"
            );

          const data = await res.json();

          if (data.count === 0) throw new Error("recipe not found");

          setPagination({
            count: data.count,
            currentPage: data.to,
            next: data._links.next.href,
          });
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
    [query, mealType, health, setIsLoading, setPagination]
  );

  return { recipes };
}
