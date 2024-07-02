/* eslint-disable react/prop-types */
import { MainWrapper } from "../diary/MainWrapper";
import { RecipesProvider, RecipesContext } from "../../contexts/Recipes";
import { DiaryProvider } from "../../contexts/DiaryContext";
import { Title, SearchBar, Logo } from "./Sections/Title";
import { Categories } from "./Categories";
import { Meals } from "./Sections/Meals";
import { useContext } from "react";
import { TopNavBar } from "./TopNavBar";
import { DetailNav } from "./Sections/DetailNav";
import { CaloriesCount } from "./Sections/CaloriesCount";
import {
  Ingredients,
  Ingredient,
  Instructions,
  Instruction,
} from "./Sections/Ingredients";
import { Filter } from "./Sections/Filter";

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
  const { showMealDetail, showFilter } = useContext(RecipesContext);
  return (
    <MainWrapper id={2}>
      {showMealDetail ? (
        <MealDetails />
      ) : showFilter ? (
        <Filter />
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
  const { detail } = useContext(RecipesContext);
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
      {detail === "Calories Count" ? (
        <CaloriesCount />
      ) : detail === "Ingredients" ? (
        <Ingredients>
          <Ingredient item="24 .oz chopped frozen spinach (680g)" />
          <Ingredient item="24 .oz chopped frozen spinach (680g)" />
        </Ingredients>
      ) : (
        <Instructions>
          <Instruction
            number={1}
            item="Rinse the rice thoroughly, then soak it in cold water for about 15-20 minutes. Drain and set asid"
          />
          <Instruction
            number={2}
            item="Rinse the rice thoroughly, then soak it in cold water for about 15-20 minutes. Drain and set asid"
          />
        </Instructions>
      )}
    </div>
  );
}
