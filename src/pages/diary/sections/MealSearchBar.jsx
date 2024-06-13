import { useContext } from "react";
import { DiaryContext } from "../../../contexts/DiaryContext";

export function SearchMeal() {
  const { setIsSearchMeal, isSearchMeal, meal, setMeal } =
    useContext(DiaryContext);

  function handleChange(e) {
    e.preventDefault();
    setIsSearchMeal(true);
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
        {isSearchMeal && (
          <svg
            onClick={() => setMeal("")}
            className="absolute right-4 flex items-center justify-center bottom-[15px]"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.3914 13.2754C12.6355 13.5195 13.0312 13.5195 13.2753 13.2754C13.5194 13.0313 13.5194 12.6356 13.2753 12.3915L7.88387 7.00009L13.2753 1.60869C13.5194 1.36461 13.5194 0.968884 13.2753 0.724806C13.0312 0.480729 12.6355 0.480729 12.3914 0.724806L6.99999 6.11621L1.60861 0.724829C1.36453 0.480751 0.968805 0.480751 0.724728 0.724829C0.48065 0.968906 0.48065 1.36463 0.724728 1.60871L6.11611 7.00009L0.724726 12.3915C0.480648 12.6355 0.480648 13.0313 0.724726 13.2754C0.968802 13.5194 1.36453 13.5194 1.60861 13.2754L6.99999 7.88397L12.3914 13.2754Z"
              fill="#63626E"
            />
          </svg>
        )}

        <input
          required
          className={`block h-12 opacity-0.5 pt-4 pb-3 pl-10 
            w-full bg-transparent outline-1 outline-grey-5 border
             rounded-lg focus:outline-none focus:border-primary-light
            placeholder:text-base placeholder:text-grey-4 placeholder:font-normal
          placeholder:font-montserrat border-grey-4`}
          placeholder="search meal"
          autoFocus={isSearchMeal}
          autoComplete="off"
          value={meal}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
