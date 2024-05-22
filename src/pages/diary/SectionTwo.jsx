export default function SectionTwo() {
  return (
    <div className="w-full p-4">
      <MealSection />
    </div>
  );
}

export function MealSection() {
  return (
    <div
      className="text-base font-montserrat w-full flex flex-col
     justify-between text-grey-6 mt-[-40px] gap-2"
    >
      <SectionHeading />
      <div className="w-full flex flex-col justify-between items-center gap-2">
        <Meal />
        <Meal />
      </div>
    </div>
  );
}

export function Meal() {
  return (
    <div
      className="flex justify-between w-full h-[77px]
     rounded border-grey-1 border p-1 items-start
     "
    >
      <div className="w-full flex gap-3 items-center">
        <img
          className="rounded"
          src="/PoundedYam.png"
          alt="Oha and pounded yam"
        />
        <div className="flex flex-col gap-2">
          <p className="font-semibold ">Oha and pounded yam</p>
          <p>69 kcal. 1 serving (300 ml)</p>
        </div>
      </div>
      <div
        className="
        h-full pt-2 pr-[10px]"
      >
        <img src="/Hamburger.svg" alt="Edit button" />
      </div>
    </div>
  );
}

export function SectionHeading() {
  return (
    <div
      className="flex justify-between items-center 
    font-semibold w-full"
    >
      <p>Meals</p>
      <div className="flex justify-between items-center  gap-2">
        <p className="text-[13px]">Add</p>
        <AddBtn />
      </div>
    </div>
  );
}

export function AddBtn() {
  return (
    <svg
      className="cursor-pointer"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM10.75 7C10.75 6.58579 10.4142 6.25 10 6.25C9.58579 6.25 9.25 6.58579 9.25 7V9.25H7C6.58579 9.25 6.25 9.58579 6.25 10C6.25 10.4142 6.58579 10.75 7 10.75H9.25V13C9.25 13.4142 9.58579 13.75 10 13.75C10.4142 13.75 10.75 13.4142 10.75 13V10.75H13C13.4142 10.75 13.75 10.4142 13.75 10C13.75 9.58579 13.4142 9.25 13 9.25H10.75V7Z"
        fill="#3F6A11"
      />
    </svg>
  );
}
