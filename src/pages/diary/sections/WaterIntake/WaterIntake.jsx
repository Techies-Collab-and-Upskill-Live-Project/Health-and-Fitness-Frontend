/* eslint-disable react/prop-types */
import { useState } from "react";
import { OuterContainer } from "../../Containers";
import ScreenOverlay from "../../../../components/ScreenOverlay";
import SmallModal from "../../../../components/SmallModal";
import { useNavigate } from "react-router-dom";

export default function WaterIntakeSection() {
  return (
    <OuterContainer title="Water intake">
      <WaterIntake />
    </OuterContainer>
  );
}

export function WaterIntake() {
  const navigate = useNavigate();
  const [getSettings, setGetSettings] = useState(false);

  function handleClick() {
    setGetSettings((value) => !value);
  }

  function handleGetSettings() {
    navigate("/diary/water-setting");
  }

  return (
    <div
      className="flex flex-col justify-between w-full gap-3
       rounded border-grey-1 border p-3
       "
    >
      <div className="w-full flex justify-between items-center">
        <p
          className="font-inter text-grey-6 tracking-[0.3em]
            text-base font-normal leading-8"
        >
          0L
        </p>
        <img
          onClick={handleClick}
          className="cursor-pointer"
          src="/Hamburger.svg"
          alt="Edit button"
        />
      </div>
      {getSettings && (
        <ScreenOverlay>
          <SmallModal handleClick={handleGetSettings} textColor="text-grey-6">
            <svg
              width="22"
              height="24"
              viewBox="0 0 22 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.75 12C8.75 10.7574 9.75736 9.75002 11 9.75002C12.2426 9.75002 13.25 10.7574 13.25 12C13.25 13.2427 12.2426 14.25 11 14.25C9.75736 14.25 8.75 13.2427 8.75 12Z"
                fill="#151425"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.58523 3.2323C8.56564 -0.203083 13.4342 -0.203084 14.4147 3.2323C14.7184 4.2967 15.812 4.92806 16.8857 4.65893C20.351 3.7903 22.7853 8.00664 20.3004 10.5734C19.5305 11.3687 19.5305 12.6314 20.3004 13.4266C22.7853 15.9934 20.351 20.2097 16.8857 19.3411C15.812 19.072 14.7184 19.7033 14.4147 20.7677C13.4342 24.2031 8.56564 24.2031 7.58523 20.7677C7.28146 19.7033 6.18792 19.072 5.11423 19.3411C1.6489 20.2097 -0.785401 15.9934 1.69952 13.4266C2.46944 12.6314 2.46944 11.3687 1.69952 10.5734C-0.785401 8.00664 1.6489 3.7903 5.11423 4.65893C6.18792 4.92806 7.28146 4.2967 7.58523 3.2323ZM11 8.25002C8.92893 8.25002 7.25 9.92895 7.25 12C7.25 14.0711 8.92893 15.75 11 15.75C13.0711 15.75 14.75 14.0711 14.75 12C14.75 9.92895 13.0711 8.25002 11 8.25002Z"
                fill="#151425"
              />
            </svg>
            Settings
          </SmallModal>
        </ScreenOverlay>
      )}
      <div className="w-full flex flex-wrap gap-2 items-center">
        {Array.from({ length: 2 }, (_, index) => (
          <WaterIntakeBox icon={"/cup.svg"} key={index} />
        ))}
        <WaterIntakeBox icon={"/PlusBtn.svg"} />

        {Array.from({ length: 4 }, (_, index) => (
          <WaterIntakeBox key={index} />
        ))}
      </div>
    </div>
  );
}

function WaterIntakeBox({ icon = null }) {
  return (
    <div
      className="rounded bg-tomato-1 w-12 
  h-[58px] flex items-center justify-center"
    >
      {icon ? <img src={`${icon}`} alt={`${icon}`} /> : null}
    </div>
  );
}
