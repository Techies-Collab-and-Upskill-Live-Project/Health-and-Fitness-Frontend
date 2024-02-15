import { useEffect, useState } from "react";
// import { Link } from 'react-router-dom';

const images = [
  { id: 0, name: "Group 26086143" },
  { id: 1, name: "Group 26086145" },
  { id: 2, name: "Group 26086144" },
];

export default function OnBoarding() {
  const [currentID, setCurrentID] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentID(currentID != 2 ? currentID + 1 : currentID);
    }, 2300);

    //Clearing the interval
    return () => clearInterval(interval);
  });

  return (
    <div
      className="px-4 pt-4 pb-7 grid gap-3.5 grid-rows-[1.5fr_1fr] 
    bg-primary-1 my-0 mx-auto w-screen h-screen max-w-screen-sm"
    >
      <div className="grid content-between h-[416px]">
        <img src="/Logo plain background.svg" alt="FudHouse logo" />
        {images.map(
          (image) =>
            currentID === image.id && (
              <img
                src={`/${image.name}.svg`}
                alt={`image.name`}
                key={image.id}
                className={`mx-auto ${
                  currentID === 0
                    ? "animate-fadeOutImg1"
                    : currentID === 1 && "animate-fadeOutImg"
                }`}
              />
            )
        )}
      </div>
      <div className="grid justify-center items-center gap-2">
        <div className="grid justify-items-center items-center gap-6">
          <div className="grid gap-6 content-between justify-items-center p-1">
            <p
              key={currentID}
              className={`h-[81px] ${
                currentID === 0
                  ? "animate-textAnim1"
                  : currentID === 1
                  ? "animate-textAnim"
                  : "animate-lastText"
              } flex items-end text-center font-montserrat text-[#000] text-lg`}
            >
              {currentID === 0
                ? "Stay healthy as you track your food, exercise and water intake."
                : currentID === 1
                ? "Meals curated specially for you!"
                : "Plan your meals in advance while meeting your calorie and nutritional goals"}
            </p>
            <div className="flex gap-2.5">
              <div
                className={`inline-block w-[20px] h-1 rounded-[5px] ${
                  currentID === 0 ? "bg-tomato-5" : "bg-grey-1"
                }`}
              ></div>
              <div
                className={`inline-block w-[20px] h-1 rounded-[5px] ${
                  currentID === 1 ? "bg-tomato-5" : "bg-grey-1"
                }`}
              ></div>
              <div
                className={`inline-block w-[20px] h-1 rounded-[5px] ${
                  currentID === 2 ? "bg-tomato-5" : "bg-grey-1"
                }`}
              ></div>
            </div>
          </div>
          <Button>Get started</Button>
        </div>
        <p className="text-base font-normal montserrat text-[#131313] text-center">
          Already have an account?<span> </span>
          <a href="#" className="text-tomato-5">
            Log in
          </a>
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
