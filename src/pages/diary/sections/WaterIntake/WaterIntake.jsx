/* eslint-disable react/prop-types */
import { OuterContainer } from "../../Containers";

export default function WaterIntakeSection() {
  return (
    <OuterContainer title="Water intake">
      <WaterIntake />
    </OuterContainer>
  );
}

export function WaterIntake() {
  const empty = false;
  return (
    <div
      className="flex flex-col justify-between w-full gap-3
       rounded border-grey-1 border p-3
       "
    >
      <div className="w-full flex justify-between items-center">
        <p
          className="font-inter text-grey-6 tracking-[0.3em]
            text-base font-normal leading-8"
        >
          0L
        </p>
        <img
          className="cursor-pointer"
          src="/Hamburger.svg"
          alt="Edit button"
        />
      </div>
      {empty ? (
        <div className="w-full flex flex-wrap justify-between items-center">
          <WaterIntakeBox icon={"/PlusBtn.svg"} />
          <WaterIntakeBox />
          <WaterIntakeBox />
          <WaterIntakeBox />
          <WaterIntakeBox />
          <WaterIntakeBox />
          <WaterIntakeBox />
        </div>
      ) : (
        <div className="w-full flex flex-wrap gap-2 items-center">
          <WaterIntakeBox icon={"/cup.svg"} />
          <WaterIntakeBox icon={"/cup.svg"} />
          <WaterIntakeBox icon={"/cup.svg"} />
          <WaterIntakeBox icon={"/cup.svg"} />
          <WaterIntakeBox icon={"/cup.svg"} />
          <WaterIntakeBox icon={"/cup.svg"} />
          <WaterIntakeBox icon={"/cup.svg"} />
          <WaterIntakeBox icon={"/PlusBtn.svg"} />
        </div>
      )}
    </div>
  );
}

function WaterIntakeBox({ icon = null }) {
  return (
    <div
      className="rounded bg-tomato-1 w-12 
  h-[58px] flex items-center justify-center"
    >
      {icon ? <img src={`${icon}`} alt={`${icon}`} /> : null}
    </div>
  );
}
