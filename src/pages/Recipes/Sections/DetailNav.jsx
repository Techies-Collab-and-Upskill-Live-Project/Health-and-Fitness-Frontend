import { useContext } from "react";
import { RecipesContext } from "../../../contexts/Recipes";

/* eslint-disable react/prop-types */
export function DetailNav() {
  return (
    <div className="py-[10px] px-4 flex bg-primary-1 gap-[9px] justify-between">
      <TextSwitcher name="Calories Count" />
      <TextSwitcher name="Ingredients" />
      <TextSwitcher name="Instructions" />
    </div>
  );
}
function TextSwitcher({ name }) {
  const { detail, setDetail } = useContext(RecipesContext);

  return (
    <div className="gap-3 flex flex-col justify-between items-center w-full">
      <p
        onClick={() => setDetail(name)}
        className={`cursor-pointer text-base text-nowrap ${
          name === detail
            ? "text-primary-10 font-semibold"
            : "font-normal text-grey-3"
        }`}
      >
        {name}
      </p>
      <div
        className={`h-[2px] ${name === detail ? "bg-primary-10 w-full" : ""}`}
      ></div>
    </div>
  );
}
