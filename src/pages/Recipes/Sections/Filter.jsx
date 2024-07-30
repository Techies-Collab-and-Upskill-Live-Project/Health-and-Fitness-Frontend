/* eslint-disable react/prop-types */
import { RecipesContext } from "../../../contexts/Recipes";
import { useContext } from "react";

export function Filter() {
  const { setShowFilter, setIsNavBack } = useContext(RecipesContext);

  return (
    <div className="p-4 flex flex-col gap-4 justify-between">
      <div className="flex w-full justify-between items-center">
        <p className="flex items-center gap-2 font-semibold text-[19px] leading-[27px] text-grey-6">
          <span className="w-6 h-6 flex items-center justify-center">
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 0.25C1.48122 0.25 0.25 1.48122 0.25 3C0.25 4.51878 1.48122 5.75 3 5.75C4.51878 5.75 5.75 4.51878 5.75 3C5.75 1.48122 4.51878 0.25 3 0.25ZM1.75 3C1.75 2.30964 2.30964 1.75 3 1.75C3.69036 1.75 4.25 2.30964 4.25 3C4.25 3.69036 3.69036 4.25 3 4.25C2.30964 4.25 1.75 3.69036 1.75 3Z"
                fill="#3C3B49"
              />
              <path
                d="M9 2.25C8.58579 2.25 8.25 2.58579 8.25 3C8.25 3.41421 8.58579 3.75 9 3.75L17 3.75C17.4142 3.75 17.75 3.41421 17.75 3C17.75 2.58579 17.4142 2.25 17 2.25L9 2.25Z"
                fill="#3C3B49"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15 7.25C13.4812 7.25 12.25 8.48122 12.25 10C12.25 11.5188 13.4812 12.75 15 12.75C16.5188 12.75 17.75 11.5188 17.75 10C17.75 8.48122 16.5188 7.25 15 7.25ZM13.75 10C13.75 9.30964 14.3096 8.75 15 8.75C15.6904 8.75 16.25 9.30964 16.25 10C16.25 10.6904 15.6904 11.25 15 11.25C14.3096 11.25 13.75 10.6904 13.75 10Z"
                fill="#3C3B49"
              />
              <path
                d="M1 9.25C0.585787 9.25 0.25 9.58579 0.25 10C0.25 10.4142 0.585786 10.75 1 10.75L9 10.75C9.41421 10.75 9.75 10.4142 9.75 10C9.75 9.58579 9.41421 9.25 9 9.25L1 9.25Z"
                fill="#3C3B49"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 14.25C1.48122 14.25 0.25 15.4812 0.25 17C0.25 18.5188 1.48122 19.75 3 19.75C4.51878 19.75 5.75 18.5188 5.75 17C5.75 15.4812 4.51878 14.25 3 14.25ZM1.75 17C1.75 16.3096 2.30964 15.75 3 15.75C3.69036 15.75 4.25 16.3096 4.25 17C4.25 17.6904 3.69036 18.25 3 18.25C2.30964 18.25 1.75 17.6904 1.75 17Z"
                fill="#3C3B49"
              />
              <path
                d="M9 16.25C8.58579 16.25 8.25 16.5858 8.25 17C8.25 17.4142 8.58579 17.75 9 17.75H17C17.4142 17.75 17.75 17.4142 17.75 17C17.75 16.5858 17.4142 16.25 17 16.25H9Z"
                fill="#3C3B49"
              />
            </svg>
          </span>
          Filter meals
        </p>
        <svg
          onClick={() => {
            setIsNavBack(false);
            setShowFilter(false);
          }}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM12.6516 8.65165C12.9445 8.35876 12.9445 7.88388 12.6516 7.59099C12.3587 7.2981 11.8839 7.2981 11.591 7.59099L9.99998 9.18198L8.40899 7.59099C8.1161 7.2981 7.64123 7.2981 7.34833 7.59099C7.05544 7.88388 7.05544 8.35876 7.34833 8.65165L8.93932 10.2426L7.34833 11.8336C7.05544 12.1265 7.05544 12.6014 7.34833 12.8943C7.64123 13.1872 8.1161 13.1872 8.40899 12.8943L9.99998 11.3033L11.591 12.8943C11.8839 13.1872 12.3587 13.1872 12.6516 12.8943C12.9445 12.6014 12.9445 12.1265 12.6516 11.8336L11.0606 10.2426L12.6516 8.65165Z"
            fill="#2A460B"
          />
        </svg>
      </div>
      <div className="flex w-full flex-col gap-4">
        <p className="font-medium text-base text-grey-5">
          Select one that applies to you
        </p>
        <Diet diet="Vegetarian" />
        <Diet diet="Vegan" />
      </div>
      <div className="flex w-full flex-col gap-4 text-base text-grey-5">
        <p className="font-semibold">ALLERGIES</p>
        <Allergy name="Dairy" />
        <Allergy name="Peanut" />
        <Allergy name="Soy" />
        <Allergy name="Egg" />
        <Allergy name="Tree Nut" />
        <Allergy name="Sulfite" />
        <Allergy name="Gluten" />
        <Allergy name="Sesame" />
        <Allergy name="Shellfish" />
        <Allergy name="Wheat" />
        <Allergy name="Grain" />
        <Allergy name="Red meat" />
      </div>
    </div>
  );
}

function Diet({ diet }) {
  const { filterOptions, setFilterOptions } = useContext(RecipesContext);

  function handleClick() {
    if (filterOptions.diet.includes(diet)) {
      const rest = filterOptions.diet.filter((item) => item !== diet);
      setFilterOptions((prev) => ({
        ...prev,
        diet: rest,
      }));
    } else {
      setFilterOptions((prev) => ({
        ...prev,
        diet: [...filterOptions.diet, diet],
      }));
    }
  }

  return (
    <p
      onClick={handleClick}
      className={`transition duration-150 h-14 text-base min-w-16 flex items-center rounded-md
         justify-center cursor-pointer ${
           filterOptions.diet.includes(diet)
             ? "bg-primary-9 font-semibold text-white-2"
             : "bg-white-2 border border-white-1 font-normal text-grey-12"
         }`}
    >
      {diet}
    </p>
  );
}
function Allergy({ name }) {
  const { filterOptions, setFilterOptions } = useContext(RecipesContext);

  function handleClick() {
    if (filterOptions.intolerances.includes(name)) {
      const rest = filterOptions.intolerances.filter((item) => item !== name);
      setFilterOptions((prev) => ({
        ...prev,
        intolerances: rest,
      }));
    } else {
      setFilterOptions((prev) => ({
        ...prev,
        intolerances: [...filterOptions.intolerances, name],
      }));
    }
  }

  return (
    <div onClick={handleClick} className="flex justify-between gap-4">
      <p className="font-medium">{name}</p>
      <p
        className={`transition duration-150 w-5 h-5 rounded-full border ${
          filterOptions.intolerances.includes(name)
            ? "bg-primary-9 border-primary-9"
            : "border-grey-5"
        }`}
      ></p>
    </div>
  );
}
