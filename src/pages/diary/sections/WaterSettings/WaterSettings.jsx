import { DiaryProvider } from "../../../../contexts/DiaryContext";
import { MainWrapper } from "../../MainWrapper";
import TopNavBar from "../../TopNavBar";

export function Settings() {
  return (
    <DiaryProvider>
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
      justify-around items-center"
        >
          hello
        </div>
      </MainWrapper>
    </DiaryProvider>
  );
}

function WaterGoal() {
  return <div className=""></div>;
}
