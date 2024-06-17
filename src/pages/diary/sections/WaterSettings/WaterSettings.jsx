import { useGetQuery } from "../../../../hooks/useGetQuery";
import { MainWrapper } from "../../MainWrapper";
import TopNavBar from "../../TopNavBar";
import DraggableProgressBar from "./DraggableProgressBar";

export default function Settings() {
  return (
      <MainWrapper id={1}>
        <TopNavBar
          bg="primary-9"
          iconFill="white-3"
          iconStroke="grey-6"
          text="Meals"
          textColor="white-3"
        />
        <div
          className="w-full min-h-[650px] h-full px-4 flex flex-col
      gap-3 items-center font-montserrat"
        >
          <WaterGoal />
          <Recommendation />
          <Advice />
        </div>
      </MainWrapper>
  );
}

function WaterGoal() {
  const { data: waterIntake, status: waterIntakeStatus } =
    useGetQuery("waterIntake");

  return (
    <div className="w-full">
      <p className="text-black text-base font-semibold min-h-14 flex items-center justify-center w-full">
        Daily water goal
      </p>
      <div
        className=" font-montserrat min-h-[136px] w-full p-3 flex flex-col
       items-center justify-around rounded border bg-white-4
       border-grey-1"
      >
        <p className="w-full text-right font-medium text-xs leading-[18px] text-grey-5">
          {waterIntakeStatus === 404 ? 0 : waterIntake.water_goal / 0.25}{" "}
          Glasses
        </p>
        <p
          className="text-grey-6 font-semibold min-h-20
        text-[28px] leading-[38px]"
        >
          {waterIntakeStatus === 404 ? 0 : waterIntake.water_goal} Litres
        </p>
        <DraggableProgressBar />
      </div>
    </div>
  );
}

function Recommendation() {
  return (
    <div
      className="font-montserrat w-full 
    flex flex-col gap-3 mb-4"
    >
      <p className="font-semibold text-base text-grey-6">
        Recommended water intake
      </p>
      <div
        className="w-full flex flex-col items-center
    bg-white-4 text-grey-4 font-normal text-[13px] 
    leading-5 border px-2 py-4 gap-4 border-grey-1 rounded"
      >
        <p className="w-full flex items-start">
          <span className="w-0.5 h-0.5 rounded-full m-2 bg-grey-4"></span>About
          15.5 cups (3.7 liters) of fluids a day for men.
        </p>
        <p className="w-full flex items-start">
          <span className="w-0.5 h-0.5 rounded-full m-2 bg-grey-4"></span> About
          11.5 cups (2.7 liters) of fluids a day for women.
        </p>
      </div>
    </div>
  );
}

function Advice() {
  return (
    <div
      className="font-montserrat w-full min-h-80
    flex flex-col gap-3"
    >
      <p className="font-semibold text-base text-grey-6">
        How do I know if I&apos;m drinking enough?
      </p>
      <div
        className="w-full flex flex-col items-center
    bg-white-4 text-[#717171] font-normal text-[13px] 
    leading-5 border px-2 py-4 gap-4 border-grey-1 rounded"
      >
        <div className="w-full">
          <span>Your fluid intake is probably adequate if:</span>
          <p className="w-full flex items-start">
            <span className="w-0.5 h-0.5 rounded-full m-2 bg-grey-4"></span>
            About You rarely feel thirsty
          </p>
          <p className="w-full flex items-start">
            <span className="w-0.5 h-0.5 rounded-full m-2 bg-grey-4"></span>{" "}
            About Your urine is colourless or light yellow
          </p>
        </div>
        <p className="w-full flex flex-wrap">
          Your doctor or dietitian can help you determine the amount of water
          that&apos;s right for you every day.
        </p>
        <div className="w-full flex flex-wrap">
          To prevent dehydration and make sure your body has the fluids it
          needs, make water your beverage of choice. It&apos;s a good idea to
          drink a glass of water:
          <p className="w-full flex items-start">
            <span className="w-0.5 h-0.5 rounded-full m-2 bg-grey-4"></span>With
            each meal and between meals
          </p>
          <p className="w-full flex items-start">
            <span className="w-0.5 h-0.5 rounded-full m-2 bg-grey-4"></span>{" "}
            Before, during and after exercise
          </p>
          <p className="w-full flex items-start">
            <span className="w-0.5 h-0.5 rounded-full m-2 bg-grey-4"></span> If
            you feel thirsty.
          </p>
        </div>
      </div>
      <p className="font-normal text-grey-4 text-[11px] leading-[17px]">
        *Recommendations from{" "}
        <span className="text-grey-9 font-bold leading-[18px]">
          Mayo clinic
        </span>
      </p>
    </div>
  );
}
