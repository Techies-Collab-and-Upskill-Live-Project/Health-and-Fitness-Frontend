/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
export const AccountContext = createContext();

export function AccountProvider({ children }) {
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);

  const [showEditName, setShowEditName] = useState(false);
  const [showEditSex, setShowEditSex] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [showActivityLevel, setShowActivityLevel] = useState(false);
  const [showNotificationalPreferences, setShowNotificationalPreferences] =
    useState(false);
  const [preferences, setPreferences] = useState({});

  const [selectedActivity, setSelectedActivity] = useState(null);

  return (
    <AccountContext.Provider
      value={{
        showPersonalDetails,
        setShowPersonalDetails,
        showEditName,
        setShowEditName,
        showEditSex,
        setShowEditSex,
        showLogOut,
        setShowLogOut,
        showActivityLevel,
        setShowActivityLevel,
        selectedActivity,
        setSelectedActivity,
        showNotificationalPreferences,
        setShowNotificationalPreferences,
        preferences,
        setPreferences,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}
