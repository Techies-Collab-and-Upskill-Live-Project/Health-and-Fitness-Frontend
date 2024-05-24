import { createPortal } from "react-dom";

/* eslint-disable react/prop-types */
export default function ScreenOverlay({ children }) {
  return createPortal(
    <div
      className="
    w-screen h-screen max-w-screen-sm bg-[rgba(0,0,0,0.5)] 
    absolute top-0 z-10"
    >
      {children}
    </div>
  , document.getElementById("wrapper"));
}
