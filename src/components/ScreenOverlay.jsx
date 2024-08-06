import { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { DiaryContext } from "../contexts/DiaryContext";

/* eslint-disable react/prop-types */
export default function ScreenOverlay({ children }) {
  const {
    setCurrentId,
    setCurrentExerciseId,
    setShowWaterSettings,
    setGetSettings,

    setExerciseModalID,
  } = useContext(DiaryContext);

  const overlayRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        setCurrentId(null);
        setCurrentExerciseId(false);
        setShowWaterSettings(false);
        setGetSettings(false);
        setExerciseModalID(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    setCurrentId,
    setCurrentExerciseId,
    setShowWaterSettings,
    setGetSettings,
    setExerciseModalID,
  ]);

  return createPortal(
    <div
      className="
    w-screen h-screen max-w-screen-sm bg-[rgba(0,0,0,0.5)] 
    absolute top-0 z-10"
    >
      <div className="mx-auto w-max h-max" ref={overlayRef}>
        {children}
      </div>
    </div>,
    document.getElementById("wrapper")
  );
}
