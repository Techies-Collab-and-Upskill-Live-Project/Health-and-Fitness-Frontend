/* eslint-disable react/prop-types */
export function Button({
  handleClick,
  isValid = true,
  width = "w-[328px]",
  height = "h-[48px]",
  bgColor,
  border = "border-0",
  shadowBox = "shadow-none",
  mt = "mt-0",
  type,
  children,
}) {
  return (
    <button
      className={`transition-all duration-500 ${
        isValid
          ? `${bgColor} cursor-pointer active:scale-[0.97]`
          : `${bgColor} cursor-auto`
      } ${width} ${height} rounded-lg
  font-4 text-white-2 flex items-center justify-center
  font-montserrat font-medium
   ${mt} ${bgColor} ${border} ${shadowBox}`}
      onClick={handleClick}
      disabled={!isValid}
      type={type}
    >
      {children}
    </button>
  );
}
