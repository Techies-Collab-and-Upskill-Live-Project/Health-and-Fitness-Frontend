import { InnerContainer, OuterContainer } from "../Containers";

export default function ExerciseSection() {
  return (
    <OuterContainer title="Exercises">
      <Exercise />
      <Exercise />
    </OuterContainer>
  );
}

export function Exercise() {
  return (
    <InnerContainer image_url={"/exercise.png"} name="Exercise">
      <div className="flex flex-col h-full items-end">
        <p>Walking</p>
      </div>
    </InnerContainer>
  );
}
