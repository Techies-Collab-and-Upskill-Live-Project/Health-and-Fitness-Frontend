/* eslint-disable react/prop-types */
import { useState } from "react";

import { useSwipeable } from "react-swipeable";

const SwipeableDiv = ({ children }) => {
  const [isSwiped, setIsSwiped] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (!isSwiped) setIsSwiped(true);
    },
    onSwipedRight: () => {
      if (isSwiped) setIsSwiped(false);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div
      {...handlers}
      className="relative w-full h-20 overflow-hidden"
    >
      <div
        className={`absolute inset-0 transition-transform duration-300 ${
          isSwiped ? "transform -translate-x-7" : ""
        }`}
      >
        {children}
        <div
          className={`absolute top-0 right-[-35px] w-8 h-full flex items-center justify-center ${
            isSwiped ? "block" : "hidden"
          }`}
        >
          <img
            className="cursor-pointer"
            src="/Trash.svg"
            alt="Delete Meal"
          />
        </div>
      </div>
    </div>
  );
};

export default SwipeableDiv;
