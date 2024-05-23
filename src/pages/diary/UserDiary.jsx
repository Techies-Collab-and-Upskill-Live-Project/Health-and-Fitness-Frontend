import CalorieLog from "./CalorieLog";
import { Pentagon } from "../../components/Pentagon";
import { Pill } from "../../components/Pill";
import SectionTwo from "./SectionTwo";

export default function Diary() {
  return (
    <div
      className="overflow-auto h-dvh my-0 mx-auto font-montserrat
        max-w-screen-sm w-full bg-white-3"
    >
      <CalorieLog />
      <Pentagon />
      <Pill />
      <SectionTwo/>
    </div>
  );
}
