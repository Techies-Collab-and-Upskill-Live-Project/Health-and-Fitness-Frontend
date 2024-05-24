import MealSection from "./sections/MealSection";
import ExerciseSection from "./sections/ExerciseSection";
import WaterIntakeSection from "./sections/WaterIntake";

/* eslint-disable react/prop-types */
export default function SectionTwo() {
  return (
    <div className="w-full p-4 mt-[-20px] flex flex-col gap-6">
      <MealSection />
      <ExerciseSection />
      <WaterIntakeSection />
    </div>
  );
}
