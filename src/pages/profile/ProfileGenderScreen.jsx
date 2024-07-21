/* eslint-disable react/prop-types */
import { useContext } from "react";

import { ProfileContext } from "../../contexts/Profile";
import { Option } from "./Option";

export default function GenderScreen() {
  return (
    <div className="w-full gap-3 flex flex-col">
      <Gender gender="Male" />
      <Gender gender="Female" />
    </div>
  );
}

function Gender({ gender }) {
  const { profile, setProfile } = useContext(ProfileContext);

  return (
    <Option
      value={gender}
      type={profile.gender}
      onClick={() =>
        setProfile((prev) => ({
          ...prev,
          gender: gender,
        }))
      }
    />
  );
}
