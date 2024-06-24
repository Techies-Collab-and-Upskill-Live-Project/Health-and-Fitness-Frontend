/* eslint-disable react/prop-types */
import { LeftArrow } from "../../components/Icons";
import { useContext } from "react";
import { AccountContext } from "../../contexts/Account";

function TopNavBar({ textColor, text }) {
  const { showPersonalDetails, setShowPersonalDetails } =
    useContext(AccountContext);

  function handleNavigate() {
    if (showPersonalDetails) {
      setShowPersonalDetails(false);
    }
  }

  return (
    <div
      onClick={handleNavigate}
      className={`
    w-full flex justify-between items-center
     p-2 text-${textColor} 
     font-montserrat font-semibold text-xl`}
    >
      <div className="rounded-3xl cursor-pointer shadow-[0px_0px_8px_2px_#0000001A]">
        <LeftArrow fill="white-4" stroke="grey-6" />
      </div>
      <div className="w-full flex items-center justify-center">{text}</div>
    </div>
  );
}

export default TopNavBar;
