/* eslint-disable react/prop-types */
import { MainWrapper } from "../diary/MainWrapper";
import { DiaryProvider } from "../../contexts/DiaryContext";
import { Title, SearchBar, Logo } from "./Sections/Title";
import { Categories } from "./Categories";
import { Meals } from "./Meals";
export default function Recipes() {
  return (
    <DiaryProvider>
      <RecipesPage />
    </DiaryProvider>
  );
}

function RecipesPage() {
  return (
    <MainWrapper id={2}>
      <Container>
        <Logo />
        <Title />
        <SearchBar />
        <Categories />
        <Meals />
      </Container>
    </MainWrapper>
  );
}

function Container({ children }) {
  return <div className="p-4 flex flex-col gap-4">{children}</div>;
}