import { useContext } from "react";
import { DiaryContext } from "../../../../contexts/DiaryContext";

export function MealManualInput() {
  const { setMealObject, mealObject } = useContext(DiaryContext);
  const mealQTY = mealObject?.servings ? mealObject?.servings * 300 : 1 * 300;

  function handleMealName(e) {
    setMealObject((prevObj) => ({
      ...prevObj,
      name: e.target.value,
    }));
  }

  function handleChangeServings(e) {
    const inputValue = e.target.value;
    if (/^\d{0,3}$/.test(inputValue)) {
      setMealObject((prevObj) => ({
        ...prevObj,
        servings: e.target.value,
      }));
    }
  }

  return (
    <div
      className="flex flex-col gap-3 w-full
     font-montserrat "
    >
      <p className="text-grey-6 text-base font-semibold ">
        Input meal manually
      </p>
      <div
        className="
      w-full flex flex-col justify-between h-full items-center
      bg-white-4 text-grey-4 border border-grey-1 rounded p-3 min-h-[134px]
      "
      >
        <input
          required
          className={`block h-12 opacity-0.5 py-4 pl-[10px] 
            w-full bg-transparent outline-[0.5px] outline-grey-4 border
             rounded-lg focus:outline-none focus:border-grey-9
            placeholder:text-base placeholder:text-grey-4 placeholder:font-normal
          placeholder:font-montserrat border-grey-4`}
          placeholder="input meal e.g yam porridge"
          autoComplete="off"
          value={`${mealObject?.name ? mealObject?.name : ""}`}
          onChange={handleMealName}
        />

        <div
          className="w-full flex items-center gap-[7px]
           text-grey-4 text-base font-montserrat font-normal"
        >
          <input
            required
            className={`text-center opacity-0.5
            w-[39px] h-[38px] bg-transparent outline-[0.5px] outline-grey-4 border
             rounded-lg focus:outline-none focus:border-grey-9
           font-bold border-grey-4`}
            autoComplete="off"
            value={`${mealObject?.servings ? mealObject?.servings : 1}`}
            onChange={handleChangeServings}
            maxLength="3"
            pattern="[0-9]*"
            inputMode="numeric"
          />
          <div
            className="pl-[16px] py-[10px] h-[38px] flex w-full opacity-0.5 rounded-lg
            items-center border-[0.5px] border-grey-4"
          >
            {`Serving(${mealQTY}ml)`}
          </div>
        </div>
      </div>
    </div>
  );
}
