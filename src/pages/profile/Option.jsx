/* eslint-disable react/prop-types */
import { Button } from "../../components/Button";

export function Option({ value, type, onClick }) {
  return (
    <Button
      width="w-full"
      height="h-12"
      border={type !== value ? "border border-grey-1" : ""}
      handleClick={onClick}
      bgColor={`transition duration-300 ${
        type === value ? "bg-primary-9" : "bg-white-3"
      }`}
    >
      <p className={type === value ? "text-white-4" : "text-grey-4"}>{value}</p>
    </Button>
  );
}
