import { useEffect } from "react";
import { useState } from "react";

const images = [
  { id: 0, name: "Group 26086143" },
  { id: 1, name: "OBJECTS" },
  { id: 2, name: "Group 26086144" },
];
export default function OnBoarding() {
  const [currentID, setCurrentID] = useState(0);
  
  useEffect(() => {
    //Implementing the setInterval method to change the illustration
    const interval = setInterval(() => {
      setCurrentID(currentID != 2 ? currentID + 1 : currentID);
    }, 5000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [currentID]);
  return (
    <div
      className="px-4 pt-4 pb-7 grid grid-rows-[2fr_1fr] 
    bg-primary-1 my-0 mx-auto w-screen h-screen max-w-screen-sm"
    >
      <div className="grid content-between">
        <img src="/Logo plain background.svg" alt="FudHouse logo" />
        {images.map((image) =>
          currentID === 1
            ? currentID === image.id && (
                <div
                  className="mx-auto w-[246px] h-[207px] grid 
                  justify-center items-center relative"
                  key={image.id}
                >
                  <img
                    src={`/${image.name}.svg`}
                    alt={`image.name`}
                    className="absolute top-0 left-2 z-[2]"
                  />
                  <img
                    src="Background_Simple.svg"
                    alt="Illustration background"
                    className="absolute bottom-0 left-0 z-[1]"
                  />
                </div>
              )
            : currentID === image.id && (
                <img
                  src={`/${image.name}.svg`}
                  alt={`image.name`}
                  key={image.id}
                  className="mx-auto"
                />
              )
        )}
      </div>
      <div className="grid justify-center items-center"></div>
    </div>
  );
}
