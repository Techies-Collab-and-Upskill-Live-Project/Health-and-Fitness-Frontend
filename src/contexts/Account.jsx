/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
export const AccountContext = createContext();

export function AccountProvider({ children }) {
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);

  return (
    <AccountContext.Provider
      value={{ showPersonalDetails, setShowPersonalDetails }}
    >
      {children}
    </AccountContext.Provider>
  );
}
