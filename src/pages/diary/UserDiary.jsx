import CalorieLog from "./CalorieLog";
import SectionTwo from "./SectionTwo";
import { Pentagon } from "../../components/Pentagon";
import { Pill } from "../../components/Pill";
import { DiaryProvider } from "../../hooks/DiaryContext";

export default function Diary() {
  return (
    <DiaryProvider>
      <div
        id="wrapper"
        className="items-center justify-center overflow-auto h-dvh my-0 mx-auto font-montserrat
        max-w-screen-sm w-full bg-white-3"
      >
        <CalorieLog />
        <Pentagon />
        <Pill />
        <SectionTwo />
      </div>
    </DiaryProvider>
  );
}
