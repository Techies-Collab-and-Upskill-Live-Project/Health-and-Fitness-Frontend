/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
export const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState({});
  const [step, setStep] = useState(0);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        step,
        setStep,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
