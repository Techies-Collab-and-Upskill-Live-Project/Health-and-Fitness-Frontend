/* eslint-disable react/prop-types */
import { AddBtn } from "../../components/AddBtn";

export function OuterContainer({ title, handleClick, children }) {
  return (
    <div
      className="text-base font-montserrat w-full flex flex-col
       justify-between text-grey-6  gap-2"
    >
      <div
        className="flex justify-between items-center 
      font-semibold w-full"
      >
        <p>{title}</p>
        <div
          onClick={handleClick}
          className="cursor-pointer flex justify-between items-center gap-2"
        >
          <p className="text-[13px]">Add</p>
          <AddBtn />
        </div>
      </div>
      <div className="w-full flex flex-col justify-between items-center gap-2">
        {children}
      </div>
    </div>
  );
}

export function InnerContainer({
  isEmpty,
  image_url,
  name,
  handleHamburgerClick,
  children,
}) {
  return (
    <div
      className="flex justify-between w-full min-h-[77px]
       rounded border-grey-1 border p-1
       "
    >
      <div className="w-full flex gap-3 items-center">
        <img className="rounded" src={image_url} alt={name} />
        {children}
      </div>
      <div
        className="
          h-full pt-2 pr-[10px]"
      >
        {!isEmpty && (
          <img
            className="cursor-pointer"
            onClick={handleHamburgerClick}
            src="/Hamburger.svg"
            alt="Edit button"
          />
        )}
      </div>
    </div>
  );
}
