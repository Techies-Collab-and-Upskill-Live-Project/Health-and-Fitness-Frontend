/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { roundUp } from "../../../utils/helpers";
import { RecipesContext } from "../../../contexts/Recipes";
import { useRecipes } from "../../../hooks/useRecipes";
import { InlineSpinner } from "../../../components/InlineSpinner";

export function Meals() {
  const { isLoading, query, setRecipes } = useContext(RecipesContext);

  const { recipes } = useRecipes(query);

  useEffect(() => {
    setRecipes(recipes);
  }, [recipes, setRecipes]);

  return (
    <div className="flex gap-4 flex-wrap min-w-80 w-full justify-center">
      {isLoading ? (
        <InlineSpinner />
      ) : recipes.length === 0 ? (
        <p className="text-grey-3 font-medium p-3 text-center">
          Meal with the name could not be found, try using a different keyword
        </p>
      ) : (
        recipes.map(({ recipe: meal }) => {
          return (
            <Meal
              uri={meal.uri}
              name={meal.label}
              img={meal.image}
              calorie={meal.totalNutrients.ENERC_KCAL.quantity}
              key={meal.uri}
            />
          );
        })
      )}
    </div>
  );
}

function Meal({ uri, img, name, calorie }) {
  const { setShowMealDetail, setCurrentMeal, recipes } =
    useContext(RecipesContext);

  function handleClick() {
    setCurrentMeal(
      recipes.filter((recipe) => {
        return recipe.recipe.uri === uri;
      })[0].recipe
    );

    setShowMealDetail(true);
  }

  return (
    <div
      onClick={handleClick}
      className="w-[156px] cursor-pointer flex flex-col shadow-[2px_2px_20px_0px_#00000026] rounded-[5px]"
    >
      <img src={img} alt={name} className="w-[156px] h-[156px]" />
      <div
        className="bg-white-4 h-full w-full flex flex-col gap-2
       overflow-clip py-2 pl-2 rounded-[5px] justify-center"
      >
        <p className="font-semibold text-grey-6 text-[13px] leading-5">
          {name}
        </p>
        <p className="font-medium text-xs text-grey-5">
          {roundUp(calorie)}kcal / serving
        </p>
      </div>
    </div>
  );
}
