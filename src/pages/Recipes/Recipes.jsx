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
import { Ingredients, Ingredient, Instructions } from "./Sections/Ingredients";
import { Filter } from "./Sections/Filter";
import Spinner from "../../components/Spinner";
import { getUserProfile } from "../../services/apiAuths";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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
  const navigate = useNavigate();

  const { isLoading: isFetchingProfile, data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
  });

  // If user is logged out, redirect to log in page
  if (profileData?.status === 401) {
    navigate("/log-in");
  }

  if (isFetchingProfile) return <Spinner />;

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
  const { detail, currentMeal } = useContext(RecipesContext);

  return (
    <div className="flex flex-col">
      <TopNavBar bg="white-4" text={currentMeal.label} textColor="grey-6" />
      <img
        className="h-[360px]"
        src={currentMeal.image}
        alt={currentMeal.label}
      />
      <DetailNav />
      {detail === "Calories Count" ? (
        <CaloriesCount />
      ) : detail === "Ingredients" ? (
        <Ingredients>
          {currentMeal.ingredientLines.map((ing, index) => {
            return <Ingredient key={index} item={ing.text} />;
          })}
        </Ingredients>
      ) : (
        <Instructions>
          <p className="text-grey-4 font-bold text-center text-2xl">
            COMING SOON...
          </p>
        </Instructions>
      )}
    </div>
  );
}
