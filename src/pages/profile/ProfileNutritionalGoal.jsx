/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ProfileContext } from "../../contexts/Profile";
import { Option } from "./Option";

export function GoalScreen() {
  return (
    <div className="w-full gap-3 flex flex-col">
      <Goal goal="Lose weight" />
      <Goal goal="Gain weight" />
      <Goal goal="Maintain weight" />
    </div>
  );
}

function Goal({ goal }) {
  const { profile, setProfile } = useContext(ProfileContext);

  return (
    <Option
      value={goal}
      type={profile.nutritional_goal}
      onClick={() =>
        setProfile((prev) => ({
          ...prev,
          nutritional_goal: goal,
        }))
      }
    />
  );
}
