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
  overlayScreen:right-[15%] overlayScreen:left-[15%] top-[40%]"
    >
      <div
        className={`
        w-full ${bg} p-2 pl-4 font-semibold rounded-t
        `}
      >
        {title}
      </div>
      <div className="justify-between pt-0 p-4 flex flex-col w-full h-[90px]">
        {children}
        <div className="w-full flex justify-end gap-[14px]">
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
