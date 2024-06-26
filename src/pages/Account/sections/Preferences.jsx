/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { AccountContext } from "../../../contexts/Account";
import { useGetQuery } from "../../../hooks/useGetQuery";

export function Preferences() {
  const { setPreferences } = useContext(AccountContext);

  const { data: preferenceData } = useGetQuery("preferences");

  useEffect(() => {
    setPreferences(preferenceData);
  }, [setPreferences, preferenceData]);

  return (
    <div className="flex flex-col gap-3">
      <Preference title="Meal recommendation" />
      <Preference title="Water intake reminder" />
      <Preference title="Food log reminder" />
      <Preference title="Goal reminder" />
      <Preference title="Healthy eating reminder" />
    </div>
  );
}
function Preference({ title }) {
  const { preferences, setPreferences } = useContext(AccountContext);
  const backendTitle = title.replace(/ /g, "_").toLowerCase();

  function handlePreferenceChange() {
    setPreferences((pref) => ({
      ...pref,
      [backendTitle]: !preferences[backendTitle],
    }));
  }

  return (
    <div
      className="flex justify-between items-center 
      min-h-10 min-w-72 cursor-pointer border-b-[0.5px] border-grey-1"
      onClick={handlePreferenceChange}
    >
      <div className="text-lg font-semibold">{title}</div>
      <div
        className={`relative w-[52px] h-7 p-1 rounded-2xl flex items-center justify-end ${
          preferences[backendTitle] ? "bg-primary-8" : "bg-grey-1"
        }`}
      >
        <div
          className={`absolute w-5 h-5 rounded-full transition-transform transform ${
            preferences[backendTitle] ? "translate-x-0" : "translate-x-[-22px]"
          } bg-white-4`}
        ></div>
      </div>
    </div>
  );
}
