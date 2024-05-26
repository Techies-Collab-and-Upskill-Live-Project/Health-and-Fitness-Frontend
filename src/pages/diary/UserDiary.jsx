/* eslint-disable react/prop-types */

import { DiaryProvider } from "../../contexts/DiaryContext";

import CalorieLog from "./CalorieLog";
import SectionTwo from "./SectionTwo";
import { Pentagon } from "../../components/Pentagon";
import { Pill } from "../../components/Pill";
import { MainWrapper } from "./MainWrapper";
export default function Diary() {
  return (
    <DiaryProvider>
      <MainWrapper id={1}>
        <CalorieLog />
        <Pentagon />
        <Pill />
        <SectionTwo />
      </MainWrapper>
    </DiaryProvider>
  );
}
