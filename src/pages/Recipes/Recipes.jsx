/* eslint-disable react/prop-types */
import { MainWrapper } from "../diary/MainWrapper";
import { RecipesProvider, RecipesContext } from "../../contexts/Recipes";
import { DiaryProvider } from "../../contexts/DiaryContext";
import { Title, SearchBar, Logo } from "./Sections/Title";
import { Categories } from "./Categories";
import { Meals } from "./Meals";
import { useContext } from "react";
import { TopNavBar } from "./TopNavBar";
import { DetailNav } from "./DetailNav";
export default function Recipes() {
  return (
    <DiaryProvider>
      <RecipesProvider>
        <RecipesPage />
      </RecipesProvider>
    </DiaryProvider>
  );
}

function RecipesPage() {
  const { showMealDetail } = useContext(RecipesContext);
  return (
    <MainWrapper id={2}>
      {showMealDetail ? (
        <MealDetails />
      ) : (
        <Container>
          <Logo />
          <Title />
          <SearchBar />
          <Categories />
          <Meals />
        </Container>
      )}
    </MainWrapper>
  );
}

function Container({ children }) {
  return <div className="p-4 flex flex-col gap-4">{children}</div>;
}

function MealDetails() {
  return (
    <div className="flex flex-col">
      <TopNavBar
        bg="white-4"
        text="Jollof rice and chicken"
        textColor="grey-6"
      />
      <img
        className="h-[360px]"
        src="/JollofRice.png"
        alt="Jollof rice and chicken"
      />
      <DetailNav />
      <CaloriesCount />
    </div>
  );
}

function CaloriesCount() {
  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="w-full flex gap-[7px] text-grey-6 font-normal">
        <div
          className="w-[49px] h-12 border-[0.5px] flex items-center justify-center
         border-grey-4 rounded-lg"
        >
          1
        </div>
        <div
          className="pl-[16px] py-[10px] h-12 flex w-full justify-between opacity-0.5 rounded-lg
            items-center border-[0.5px] border-grey-4"
        >
          <span>{`Serving(${300}ml)`}</span>
          <p className="w-6 h-6 flex items-center justify-center">
            <img src="/angle-right.svg" alt="Recipe servings" />
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 text-base">
          <p className="text-grey-6 font-semibold">Nutrition information</p>
          <p className="text-grey-4 font-normal">1 standard serving (300ml)</p>
        </div>
      </div>
    </div>
  );
}
