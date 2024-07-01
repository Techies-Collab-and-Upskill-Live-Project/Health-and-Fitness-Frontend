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
import { CaloriesCount } from "./CaloriesCount";
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
