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
  return (
    <div className="gap-3 flex flex-col justify-between items-center w-full">
      <p
        className={`text-base text-nowrap ${
          name === "Calories Count"
            ? "text-primary-10 font-semibold"
            : "font-normal text-grey-3"
        }`}
      >
        {name}
      </p>
      <div
        className={`h-[2px] ${
          name === "Calories Count" ? "bg-primary-10 w-full" : ""
        }`}
      ></div>
    </div>
  );
}
