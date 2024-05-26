/* eslint-disable react/prop-types */
import { useContext } from "react";
import { DiaryContext } from "../hooks/DiaryContext";

export function FooterItem({ id, navLink, icon, text }) {
  const { activeID, handleFooterClick } = useContext(DiaryContext);

  return (
    <div
      onClick={() => {
        handleFooterClick(navLink, id);
      }}
      className={`flex flex-col items-center leading-5 
        ${activeID === id ? "text-primary-6" : "text-grey-3"}
    w-[52px] h-12 font-montserrat font-medium text-[13px]`}
    >
      <div
        className={`
          ${activeID === id ? "bg-primary-6" : ""} 
          h-1 w-full `}
      ></div>
      <div className="pt-1 w-full flex items-center justify-center h-6">{icon}</div>
      <p>{text}</p>
    </div>
  );
}
