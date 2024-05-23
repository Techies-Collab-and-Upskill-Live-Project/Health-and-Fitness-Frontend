/* eslint-disable react/prop-types */
import { AddBtn } from "../../components/AddBtn";

export function OuterContainer({ title, children }) {
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
        <div className="flex justify-between items-center  gap-2">
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

export function InnerContainer({ image_url, name, children }) {
  return (
    <div
      className="flex justify-between w-full h-[77px]
       rounded border-grey-1 border p-1 items-start
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
        <img src="/Hamburger.svg" alt="Edit button" />
      </div>
    </div>
  );
}
