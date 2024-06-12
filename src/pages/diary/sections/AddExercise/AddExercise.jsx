/* eslint-disable react/prop-types */
import { DiaryProvider } from "../../../../contexts/DiaryContext";
import { MainWrapper } from "../../MainWrapper";
import { AddBtn } from "../../../../components/AddBtn";
import TopNavBar from "../../TopNavBar";
import exerciseData from "../../../../data/InitialExercises.json";

export default function AddExercise() {
  return (
    <DiaryProvider>
      <MainWrapper id={1}>
        <TopNavBar
          bg="primary-9"
          iconFill="white-3"
          iconStroke="grey-6"
          text="Exercises"
          textColor="white-3"
        />
        <div
          className="w-full min-h-[650px] h-custom-dvh overflow-y-auto px-4 
          flex flex-col items-center font-montserrat bg-white-3"
        >
          <Heading />
          <DefaultExercises />
          <Note />
        </div>
      </MainWrapper>
    </DiaryProvider>
  );
}

function Heading() {
  function AddExerciseManually() {
    // Pass
  }

  return (
    <div className="flex w-full items-center justify-between mt-4">
      <p className="text-grey-6 text-[19px] font-semibold">Input exercise</p>
      <div className="cursor-pointer " onClick={AddExerciseManually}>
        <AddBtn />
      </div>
    </div>
  );
}

function DefaultExercises() {
  return (
    <div className="mt-4 w-full border-grey-1 min-h-[461px] bg-white-4 rounded border flex flex-col justify-between p-4">
      {exerciseData.map((exercise) => {
        return (
          <ExerciseOption
            key={exercise.id}
            name={exercise.name}
            timeSpent={exercise.time_spent}
            energyPerMinute={exercise.energy_per_minute}
          />
        );
      })}
    </div>
  );
}

function ExerciseOption({ name, timeSpent, energyPerMinute }) {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex gap-4 items-center">
        <div
          className="h-[31px] w-[31px] flex items-center justify-center 
          rounded-1 shadow-[0px_0px_8px_2px_#0000001A]"
        >
          <img src={`/${name}.png`} alt={name} />
        </div>
        <div className="flex flex-col justify-between h-full">
          <p className="text-grey-6 font-medium text-base">{name}</p>
          <div className="flex gap-3 text-[11px] font-normal leading-[17px] text-grey-4">
            <p>{timeSpent} mins</p>
            <p className="flex gap-[2px] items-center">
              <svg
                width="10"
                height="13"
                viewBox="0 0 10 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.04995 5.96682C8.8857 5.76682 8.68574 5.59348 8.50006 5.42014C8.02157 5.02013 7.47881 4.73345 7.02175 4.31344C5.95766 3.34008 5.72199 1.73337 6.40044 0.5C5.72199 0.653338 5.12924 1.00001 4.62219 1.38003C2.77253 2.76673 2.04409 5.21347 2.91536 7.31353C2.94393 7.3802 2.9725 7.44686 2.9725 7.53353C2.9725 7.6802 2.86537 7.81354 2.72254 7.86688C2.55829 7.93355 2.38689 7.89354 2.2512 7.78687C2.21042 7.7554 2.17649 7.71693 2.15122 7.67354C1.34422 6.72018 1.21567 5.35347 1.75843 4.26011C0.565794 5.1668 -0.0840869 6.70018 0.00875321 8.14688C0.0516025 8.48023 0.0944518 8.81357 0.215858 9.14691C0.31584 9.54692 0.508662 9.94694 0.722908 10.3003C1.4942 11.4536 2.82967 12.2803 4.26512 12.447C5.79341 12.627 7.42882 12.367 8.60004 11.3803C9.90694 10.2736 10.364 8.50023 9.69269 6.98018L9.59985 6.80685C9.44988 6.50017 9.04995 5.96682 9.04995 5.96682ZM6.79323 10.1669C6.59326 10.3269 6.26475 10.5003 6.00765 10.567C5.2078 10.8336 4.40795 10.4603 3.93661 10.0203C4.78645 9.8336 5.2935 9.24691 5.44347 8.65357C5.56488 8.12022 5.33635 7.6802 5.24351 7.16686C5.15781 6.67351 5.17209 6.2535 5.36492 5.79348C5.5006 6.04682 5.64344 6.30017 5.81483 6.50017C6.36473 7.16686 7.22886 7.4602 7.41454 8.36689C7.44311 8.46023 7.45739 8.55356 7.45739 8.65357C7.47881 9.20025 7.22172 9.80026 6.79323 10.1669Z"
                  fill="#FF6347"
                />
              </svg>
              <span>{parseInt(timeSpent * energyPerMinute)} kcal</span>
            </p>
          </div>
        </div>
      </div>
      <div className="h-full flex justify-center items-center">
        <img
          className="cursor-pointer"
          src="/Hamburger.svg"
          alt="Edit exercise"
        />
      </div>
    </div>
  );
}

function Note() {
  return (
    <div className="w-full h-32 flex items-center justify-center">
      <p className="text-grey-4 text-xs text-center font-normal font-inter">
        This is an estimate of calorie you will burn when doing the above
        exercises.
      </p>
    </div>
  );
}
