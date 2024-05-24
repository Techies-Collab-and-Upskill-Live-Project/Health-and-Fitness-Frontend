import { InnerContainer, OuterContainer } from "../Containers";

export default function ExerciseSection() {
  const empty = true;

  return (
    <OuterContainer title="Exercises">
      {empty ? (
        <InnerContainer
          isEmpty={empty}
          image_url={"/exercise.png"}
          name="Exercise"
        />
      ) : (
        <>
          <Exercise />
          <Exercise />
        </>
      )}
    </OuterContainer>
  );
}

export function Exercise() {
  return (
    <InnerContainer image_url={"/exercise.png"} name="Exercise">
      <div className="flex flex-col h-[60px] justify-end">
        <p className="flex items-center justify-center gap-2">
          <span>Walking - 100 kcal</span>{" "}
          <img src="/Flame.svg" alt="Burned calorie" />{" "}
          <span>
            6657 <span className="text-accent-4">steps</span>
          </span>
        </p>
      </div>
    </InnerContainer>
  );
}
