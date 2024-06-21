/* eslint-disable react/prop-types */
import { Pentagon } from "../../components/Pentagon";
import { DiaryProvider } from "../../contexts/DiaryContext";
import { MealPlannerProvider } from "../../contexts/MealPlanner";
import { MainWrapper } from "../diary/MainWrapper";
import MainSection from "./MainSection";
import Navigation from "./Navigation";

export default function MealPlanner() {
  return (
    <DiaryProvider>
      <MealPlannerProvider>
        <MainWrapper id={3}>
          <Navigation />
          <Pentagon type="planner" />
          <MainSection />
        </MainWrapper>
      </MealPlannerProvider>
    </DiaryProvider>
  );
}
