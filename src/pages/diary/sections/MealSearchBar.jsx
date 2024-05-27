import { useState } from "react";

export function SearchMeal() {
  const [meal, setMeal] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setMeal(e.target.value);
  }
  return (
    <div className="grid auto-rows-max gap-2 text-grey-5 w-full">
      <label className="relative grid auto-rows-max gap-2">
        <svg
          className="absolute left-4 flex items-center justify-center bottom-[13px]"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_3275_12064)">
            <path
              d="M14.4697 16.3638C14.1768 16.0709 14.1768 15.596 14.4697 15.3031C14.7626 15.0102 15.2375 15.0102 15.5304 15.3031L14.4697 16.3638ZM18.8637 18.6364C19.1566 18.9293 19.1566 19.4041 18.8637 19.697C18.5708 19.9899 18.0959 19.9899 17.803 19.697L18.8637 18.6364ZM15.5304 15.3031L18.8637 18.6364L17.803 19.697L14.4697 16.3638L15.5304 15.3031ZM15.0833 9.16675C15.0833 5.43883 12.0612 2.41675 8.33333 2.41675V0.916748C12.8897 0.916748 16.5833 4.6104 16.5833 9.16675H15.0833ZM8.33333 15.9167C12.0612 15.9167 15.0833 12.8947 15.0833 9.16675H16.5833C16.5833 13.7231 12.8897 17.4167 8.33333 17.4167V15.9167ZM1.58333 9.16675C1.58333 12.8947 4.60541 15.9167 8.33333 15.9167V17.4167C3.77698 17.4167 0.0833282 13.7231 0.0833282 9.16675H1.58333ZM0.0833282 9.16675C0.0833282 4.6104 3.77698 0.916748 8.33333 0.916748V2.41675C4.60541 2.41675 1.58333 5.43883 1.58333 9.16675H0.0833282Z"
              fill="#151425"
            />
          </g>
          <defs>
            <clipPath id="clip0_3275_12064">
              <rect
                width="20"
                height="20"
                fill="white"
                transform="matrix(0 1 1 0 0 0)"
              />
            </clipPath>
          </defs>
        </svg>

        <input
          required
          className={`block h-12 opacity-0.5 pt-4 pb-3 pl-10 
            w-full bg-transparent outline-1 outline-grey-5 border
             rounded-lg focus:outline-none focus:border-grey-8
            placeholder:text-base placeholder:text-grey-4 placeholder:font-normal
          placeholder:font-montserrat border-grey-4`}
          placeholder="search meal"
          autoComplete="off"
          value={meal}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
