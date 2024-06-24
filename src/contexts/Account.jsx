/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
export const AccountContext = createContext();

export function AccountProvider({ children }) {
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);

  const [showEditName, setShowEditName] = useState(false);
  const [showEditSex, setShowEditSex] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);

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
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}
