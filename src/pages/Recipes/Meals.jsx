import { roundUp } from "../../utils/helpers";

export function Meals() {
  return (
    <div className="flex gap-4 flex-wrap min-w-80 w-full justify-center">
      <Meal
        name="Jollof rice and chicken"
        calorie="480.56"
        img="/JollofRice.png"
      />
      <Meal
        name="Jollof rice and chicken"
        calorie="480.56"
        img="/JollofRice.png"
      />
      <Meal
        name="Jollof rice and chicken"
        calorie="480.56"
        img="/JollofRice.png"
      />
    </div>
  );
}
function Meal({ img, name, calorie }) {
  return (
    <div className="w-[156px] cursor-pointer flex flex-col shadow-[2px_2px_20px_0px_#00000026] rounded-[5px]">
      <img src={img} alt={name} className="w-[156px] h-[156px]" />
      <div
        className="bg-white-4 h-full w-full flex flex-col gap-2
       overflow-clip py-2 pl-2 rounded-[5px]"
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
