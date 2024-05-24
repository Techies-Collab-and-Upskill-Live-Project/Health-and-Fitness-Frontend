import { InnerContainer, OuterContainer } from "../Containers";

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
          <Meal />
          <Meal />
        </>
      )}
    </OuterContainer>
  );
}

export function Meal() {
  return (
    <InnerContainer image_url={"/PoundedYam.png"} name="Oha and pounded yam">
      <div className="flex flex-col gap-2">
        <p className="font-semibold ">Oha and pounded yam</p>
        <p>69 kcal. 1 serving (300 ml)</p>
      </div>
    </InnerContainer>
  );
}
