/* eslint-disable react/prop-types */
export function MetricsOption({ isSelected, value, handleClick }) {
  return (
    <p
      onClick={handleClick}
      className={`cursor-pointer text-grey-6 text-sm font-normal font-inter p-[10px] rounded-md ${
        isSelected && "bg-primary-6"
      }`}
    >
      {value}
    </p>
  );
}
