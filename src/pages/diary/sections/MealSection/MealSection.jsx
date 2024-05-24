/* eslint-disable react/prop-types */
import { useContext } from "react";
import { InnerContainer, OuterContainer } from "../../Containers";
import { DiaryContext } from "../../../../hooks/DiaryContext";
import ScreenOverlay from "../../../../components/ScreenOverlay";

export default function MealSection() {
  const empty = false;

  return (
    <OuterContainer title="Meals">
      {empty ? (
        <InnerContainer
          isEmpty={empty}
          image_url={"/Empty_Meal.png"}
          name="Empty Meal"
        />
      ) : (
        <>
          <Meal id={1} />
          <Meal id={2} />
        </>
      )}
    </OuterContainer>
  );
}

export function Meal({ id }) {
  const { currentId, setCurrentId } = useContext(DiaryContext);

  return (
    <InnerContainer
      handleHamburgerClick={() => setCurrentId(id)}
      image_url={"/PoundedYam.png"}
      name="Oha and pounded yam"
    >
      <div className="flex flex-col gap-2">
        <p className="font-semibold">Oha and pounded yam</p>
        <p>69 kcal. 1 serving (300 ml)</p>
      </div>
      {currentId === id && (
        <ScreenOverlay>
          <DeleteMealBtn id={id} />
        </ScreenOverlay>
      )}
    </InnerContainer>
  );
}

function DeleteMealBtn({ id }) {
  return (
    <div
      className="
      absolute w-40 h-16 rounded p-4 flex 
      items-center cursor-pointer gap-3
    bg-white-4 text-accent-6 bottom-[18%] right-[9%]"
    >
      <img src="/Trash.svg" alt="Delete Meal" />
      Delete
    </div>
  );
}
