/* eslint-disable react/prop-types */
export function WeightHeightInput({ value, onChange, unit }) {
  return (
    <div className="relative">
      <input
        required
        className={`text-center h-[92px] font-inter
        text-2xl font-medium text-grey-6 w-[145px]
          bg-white-3 outline-1 outline-white border
           rounded-[5px] focus:outline transition duration-300
            focus:outline-primary-7
           focus:border-0 border-grey-1`}
        inputMode="numeric"
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
      <p className="absolute bottom-3 right-2 text-grey-6 font-normal font-inter text-lg">
        {unit}
      </p>
    </div>
  );
}
