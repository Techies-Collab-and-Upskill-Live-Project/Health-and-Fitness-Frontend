/* eslint-disable react/prop-types */
export default function MainSection() {
  return (
    <div className="w-full pt-4 mt-[-65px] px-2 flex flex-col gap-4">
      <DayContainer day="Monday" />
      <DayContainer day="Tuesday" />
      <DayContainer day="Wednesday" />
      <DayContainer day="Thursday" />
      <DayContainer day="Friday" />
      <DayContainer day="Saturday" />
      <DayContainer day="Sunday" />
    </div>
  );
}
function DayContainer({ day }) {
  return (
    <div className="w-full flex flex-col gap-3 rounded border border-grey-1 p-2">
      <Title title={day} />
      <Meals>
        <Meal type="Breakfast" />
        <Meal type="Lunch" />
        <Meal type="Dinner" />
        <Meal type="Snack" />
      </Meals>
    </div>
  );
}
function Title({ title }) {
  return (
    <p
      className="w-max bg-secondary-2 px-3 py-[6px]
     rounded-[5px] text-secondary-10 font-semibold
     text-base"
    >
      {title}
    </p>
  );
}
function Meals({ children }) {
  return <div className="w-full flex flex-col gap-3">{children}</div>;
}
function Meal({ type }) {
  return (
    <label className="relative grid auto-rows-max gap-2">
      <p
        className=" w-[104px] h-8 flex items-center justify-center
         text-base font-normal text-grey-13
      absolute rounded-sm border-[1px]
       border-grey-12 left-2 top-[25%]"
      >
        {type}
      </p>
      <input
        className={`h-[52px] opacity-0.5 py-8 pl-[120px] pr-6 
          w-full bg-transparent outline-1 outline-white border
           rounded focus:outline-none transition focus:border-primary-7
          placeholder:text-xs placeholder:text-grey-13 text-grey-6 text-sm
           placeholder:font-normal font-medium
        placeholder:font-montserrat border-grey-12`}
        placeholder="Add meal"
      />
      <img
        className="absolute right-[12px] top-[35%]"
        src="/Hamburger.svg"
        alt="Delete meal"
      />
    </label>
  );
}
