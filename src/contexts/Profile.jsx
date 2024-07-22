/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
export const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState({});
  const [step, setStep] = useState(0);

  const [date, setDate] = useState({ day: "", month: "", year: "" });
  function setDOB() {
    setProfile((prev) => ({
      ...prev,
      dob: `${date.day}-${date.month}-${date.year}`,
    }));
  }

  const [weightHeight, setWeightHeight] = useState({ weight: "", height: "" });
  const [weightHeightUnit, setWeightHeightUnit] = useState({
    weight: "Kg",
    height: "Cm",
  });

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        step,
        setStep,
        date,
        setDate,
        setDOB,
        weightHeight,
        setWeightHeight,
        weightHeightUnit,
        setWeightHeightUnit,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
