/* eslint-disable react/prop-types */
export default function SmallModal({ textColor, handleClick, children }) {
  return (
    <div
      onClick={handleClick}
      className={`absolute w-40 h-16 rounded p-4 flex 
     items-center cursor-pointer gap-3
    bg-white-4 ${textColor} bottom-[18%] right-[9%]`}
    >
      {children}
    </div>
  );
}
