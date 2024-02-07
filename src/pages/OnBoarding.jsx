import { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';

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
      className="px-4 pt-4 pb-7 grid grid-rows-[1.5fr_1fr] 
    bg-primary-1 my-0 mx-auto w-screen h-screen max-w-screen-sm"
    >
      <div className="grid content-between h-[416px]">
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
      <div className="grid justify-center items-center gap-2">
        <div className="grid justify-items-center items-center gap-6">
          <div className="grid gap-6 content-between justify-items-center p-1">
            <p className="h-[81px] flex items-end text-center font-montserrat text-[#000] text-lg">
              {currentID === 0
                ? "Stay healthy as you track your food, exercise and water intake."
                : currentID === 1
                ? "Meals curated specially for you!"
                : "Plan your meals in advance while meeting your calorie and nutritional goals"}
            </p>
            <div className="flex gap-2.5">
              <div
                className={` inline-block w-[20px] h-1 rounded-[5px] bg-${
                  currentID === 0 ? "tomato-5" : "grey-1"
                }`}
              ></div>
              <div
                className={`inline-block w-[20px] h-1 rounded-[5px] bg-${
                  currentID === 1 ? "tomato-5" : "grey-1"
                }`}
              ></div>
              <div
                className={`inline-block w-[20px] h-1 rounded-[5px] bg-${
                  currentID === 2 ? "tomato-5" : "grey-1"
                }`}
              ></div>
            </div>
          </div>
          <Button>Get started</Button>
        </div>
        <p className="text-base font-normal montserrat text-[#131313] text-center">
          Already have an account?
          <Link to="#" className="text-tomato-5">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function Button({ children }) {
  return (
    <button
      className="bg-primary-9 w-[328px] h-[48px] rounded-lg
  font-4 text-white-2 text-center font-montserrat font-medium"
    >
      {children}
    </button>
  );
}
