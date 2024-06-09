import { DiaryProvider } from "../../../../contexts/DiaryContext";
import { MainWrapper } from "../../MainWrapper";
import { AddBtn } from "../../../../components/AddBtn";
import TopNavBar from "../../TopNavBar";

export default function AddExercise() {
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
        className="w-full min-h-[650px] h-full px-4 flex flex-col
      gap-3 items-center font-montserrat"
      >
        <Heading />
      </div>
    </MainWrapper>
  </DiaryProvider>;
}

function Heading() {
  function AddExerciseManually() {
    // Pass
  }

  return (
    <div className="flex w-full items-center justify-between">
      <p className="text-grey-6 text-[19px] font-semibold">Input exercise</p>
      <div onClick={AddExerciseManually}>
        <AddBtn />
      </div>
    </div>
  );
}
