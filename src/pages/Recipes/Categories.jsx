import { useContext } from "react";
import { RecipesContext } from "../../contexts/Recipes";

/* eslint-disable react/prop-types */
export function Categories() {
  return (
    <div className="flex flex-col w-ful gap-4 text-grey-5">
      <p className="font-semibold text-[19px] leading-[27px]">Categories</p>
      <div className="w-full gap-3 flex justify-between overflow-auto">
        <Category type="All" />
        <Category type="Local foods" name="main course" bg="/PoundedYam.png" />
        <Category type="Snacks" name="snack" bg="/Snacks.png" />
        <Category type="Drinks" name="drink" bg="/Drinks.png" />
        <Category type="Side Dishes" name="side dish" bg="/SideDishes.png" />
        <Category type="Soup" name="soup" bg="/Soup.png" />
      </div>
    </div>
  );
}
/** Biscuits and cookies
 * Bread
 * Cereals
 * Condiments and sauces
 * Desserts
 * Drinks
 * Main course
 * Pancake
 * Preps
 * Preserve
 * Salad
 * Side dish
 * Soup
 * Sarter
 * Sweets
 */
function Category({ type, bg = null }) {
  const { filterOptions, setFilterOptions } = useContext(RecipesContext);

  function handleClick() {
    if (filterOptions.type.includes(type)) {
      const rest = filterOptions.type.filter((item) => item !== type);
      setFilterOptions((prev) => ({
        ...prev,
        type: rest,
      }));
    } else {
      setFilterOptions((prev) => ({
        ...prev,
        type:
          type === "All"
            ? [type]
            : filterOptions.type.includes("All")
            ? [...filterOptions.type.filter((item) => item !== "All"), type]
            : [...filterOptions.type, type],
      }));
    }
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer flex flex-col gap-1 items-center"
    >
      <div
        className={`w-10 h-10 rounded-lg
          
           ${
             filterOptions.type.includes(type)
               ? "border border-primary-4 bg-primary-1"
               : "border-grey-4 bg-grey-1"
           } flex items-center justify-center`}
      >
        {filterOptions.type.includes("All") ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 7C15.6569 7 17 5.65685 17 4C17 2.34315 15.6569 1 14 1C12.3431 1 11 2.34315 11 4C11 5.65685 12.3431 7 14 7Z"
              className={`${
                filterOptions.type.includes("All")
                  ? "stroke-primary-8"
                  : "stroke-white-2"
              }`}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 17C5.65685 17 7 15.6569 7 14C7 12.3431 5.65685 11 4 11C2.34315 11 1 12.3431 1 14C1 15.6569 2.34315 17 4 17Z"
              className={`${
                filterOptions.type.includes("All")
                  ? "stroke-primary-8"
                  : "stroke-white-2"
              }`}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 11H17V16C17 16.2652 16.8946 16.5196 16.7071 16.7071C16.5196 16.8946 16.2652 17 16 17H12C11.7348 17 11.4804 16.8946 11.2929 16.7071C11.1054 16.5196 11 16.2652 11 16V11ZM1 1H7V6C7 6.26522 6.89464 6.51957 6.70711 6.70711C6.51957 6.89464 6.26522 7 6 7H2C1.73478 7 1.48043 6.89464 1.29289 6.70711C1.10536 6.51957 1 6.26522 1 6V1Z"
              className={`${
                filterOptions.type.includes("All")
                  ? "stroke-primary-8"
                  : "stroke-white-2"
              }`}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <img
            className={`w-10 h-10 rounded-lg ${
              type === filterOptions.type.type ? "grayscale-0" : "grayscale"
            }`}
            src={bg}
            alt={type}
          />
        )}
      </div>
      <p className="text-[10px] leading-[18px] font-medium text-nowrap">
        {type}
      </p>
    </div>
  );
}
