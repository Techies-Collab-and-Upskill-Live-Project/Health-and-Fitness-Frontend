import { useContext, useEffect } from "react";
import { DiaryContext } from "../../hooks/DiaryContext";

import { FooterItem } from "../../components/FooterItem";
import {
  DiaryIcon,
  PlannerIcon,
  AccountIcon,
  RecipeIcon,
} from "./sections/Footer/Icons";

/* eslint-disable react/prop-types */
export function MainWrapper({ id, children }) {
  const { setActiveID, activeID } = useContext(DiaryContext);

  useEffect(() => {
    setActiveID(id);
  }, [setActiveID, id]);

  return (
    <div
      id="wrapper"
      className="items-center justify-center overflow-auto
         h-custom-dvh my-0 mx-auto font-montserrat
    max-w-screen-sm w-full bg-white-3"
    >
      {children}
      <footer
        className="fixed bottom-0 w-full flex
          bg-white-3 max-w-screen-sm 
  justify-around items-center h-[52px] pb-2 mb-[-1px]"
      >
        <FooterItem
          id={1}
          navLink="/diaries"
          icon={
            <DiaryIcon fill={`${activeID === 1 ? "#3F6A11" : "#8A8992"}`} />
          }
          text="Diary"
        />
        <FooterItem
          id={2}
          navLink="/diaries"
          icon={
            <RecipeIcon stroke={`${activeID === 2 ? "#3F6A11" : "#8A8992"}`} />
          }
          text="Recipe"
        />
        <FooterItem
          id={3}
          navLink="/diaries"
          icon={
            <PlannerIcon stroke={`${activeID === 3 ? "#3F6A11" : "#8A8992"}`} />
          }
          text="Planner"
        />
        <FooterItem
          id={4}
          navLink="/diaries"
          icon={
            <AccountIcon fill={`${activeID === 4 ? "#3F6A11" : "#8A8992"}`} />
          }
          text="Account"
        />
      </footer>
    </div>
  );
}
