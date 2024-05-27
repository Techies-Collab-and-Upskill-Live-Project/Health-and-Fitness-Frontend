import { useState } from "react";

export function MealManualInput() {
  const [mealName, setMealName] = useState("");
  const [servings, setServings] = useState(1);
  const mealQTY = servings * 300;

  function handleMealName(e) {
    e.preventDefault();
    setMealName(e.target.value);
  }

  function handleChangeServings(e) {
    e.preventDefault();
    setServings(Number(e.target.value));
  }

  return (
    <div
      className="flex flex-col gap-1 w-full
     font-montserrat "
    >
      <p className="text-grey-6 text-base font-semibold ">
        Input meal manually
      </p>
      <div
        className="
      w-full flex flex-col justify-around h-full items-center
      bg-white-4 border border-grey-1 rounded p-3 min-h-[134px]
      "
      >
        <input
          required
          className={`block h-12 opacity-0.5 py-4 pl-[10px] 
            w-full bg-transparent outline-[0.5px] outline-grey-4 border
             rounded-lg focus:outline-none focus:border-0
            placeholder:text-base placeholder:text-grey-4 placeholder:font-normal
          placeholder:font-montserrat border-grey-4`}
          placeholder="input meal e.g yam porrage"
          autoComplete="off"
          value={mealName}
          onChange={handleMealName}
        />

        <div
          className="w-full flex gap-[7px]
           text-grey-4 text-base font-montserrat font-normal"
        >
          <input
            required
            className={`block p-3 opacity-0.5 py-4 pl-[10px] 
            w-[39px] h-[38px] bg-transparent outline-[0.5px] outline-grey-4 border
             rounded-lg focus:outline-none focus:border-0
           font-bold border-grey-4`}
            autoComplete="off"
            value={servings}
            onChange={handleChangeServings}
            maxLength={1}
            type="number"
          />
          <div
            className="pl-[16px] py-[10px] flex 
            items-center justify-center"
          >
            {`Serving(${mealQTY})`}
          </div>
        </div>
      </div>
    </div>
  );
}
