/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AccountContext } from "../../../../contexts/Account";

export function GenderSwitcher() {
  return (
    <div
      className="flex flex-col w-full gap-3
    font-semibold text-[19px] leading-[27px]"
    >
      <div className="flex flex-col gap-4">
        <SingleGender sex="Male" />
        <SingleGender sex="Female" />
      </div>
    </div>
  );
}
function SingleGender({ sex }) {
  const { selectedSex, setSelectedSex } = useContext(AccountContext);

  return (
    <div
      onClick={() => {
        setSelectedSex(sex);
      }}
      className={`text-base font-semibold text-grey-5 
    flex w-full p-3 justify-between items-center cursor-pointer ${
      selectedSex === sex ? "bg-primary-1" : "bg-white-4"
    }`}
    >
      <span>{sex}</span>
      <div
        className={`flex items-center justify-center w-5 h-5 
          rounded-full border-2 ${
            selectedSex === sex ? "border-primary-8" : "border-grey-5"
          }`}
      >
        {selectedSex === sex && (
          <div className="w-3 h-3 bg-primary-9 rounded-full"></div>
        )}
      </div>
    </div>
  );
}
/* eslint-disable react/prop-types */

export function Modal({
  title,
  bg,
  action,
  actionColor,
  handleCancel,
  handleAction,
  children,
}) {
  return (
    <div
      className="
  absolute max-w-[280px] min-h-[144px] rounded flex flex-col
 gap-3 text-grey-6 font-montserrat min-w-11 
  text-base bg-white-4 right-[25%] left-[25%] 
  overlayScreen:right-[15%] overlayScreen:left-[15%] top-[20%]"
    >
      <div
        className={`
        w-full ${bg} p-2 pl-4 text-[19px] leading-[27px] font-semibold rounded-t
        `}
      >
        {title}
      </div>
      <div className="justify-between flex flex-col w-full min-h-[90px]">
        {children}
        <div className="w-full flex pr-3 py-3 justify-end gap-[14px]">
          <button onClick={handleCancel} className="font-inter font-normal">
            Cancel
          </button>
          <button
            onClick={handleAction}
            className={`text-${actionColor} font-semibold`}
          >
            {action}
          </button>
        </div>
      </div>
    </div>
  );
}
