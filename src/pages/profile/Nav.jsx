import { useContext } from "react";
import { ProfileContext } from "../../contexts/Profile";

export function NavBar() {
  const { setStep } = useContext(ProfileContext);

  return (
    <div className={`pl-1 w-full h-12 flex items-center`}>
      <svg
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => setStep((step) => (step > 0 ? step - 1 : step))}
        className="cursor-pointer"
      >
        <path
          d="M16 7.5H3.83L9.42 1.91L8 0.5L0 8.5L8 16.5L9.41 15.09L3.83 9.5H16V7.5Z"
          fill="#151425"
        />
      </svg>
    </div>
  );
}
export function ProfileNav() {
  const { step } = useContext(ProfileContext);

  return (
    <div className="w-full flex flex-col gap-2 items-center">
      <div className="mt-6 flex h-full justify-center gap-1">
        {Array.from({ length: 6 }, (_, index) => (
          <HorizontalDash step={step} index={index} key={index} />
        ))}
      </div>
      <p className="text-grey-4 text-xl font-normal py-1">
        Let&apos;s build your profile
      </p>
    </div>
  );
}
/* eslint-disable react/prop-types */
function HorizontalDash({ index, step }) {
  return (
    <div
      className={`${`bg-${index <= step ? "success" : "grey-1"}`} w-10 h-1`}
    ></div>
  );
}
