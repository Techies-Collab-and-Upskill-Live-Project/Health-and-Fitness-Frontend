/* eslint-disable react/prop-types */
export function DOBInput({ placeholder, name, value, onChange, maxDigit }) {
  return (
    <input
      required
      className={`text-center h-10 
        text-sm font-medium text-grey-6
         ${
           name === "Year" ? "w-[62px]" : "w-[43px]"
         } bg-white-3 outline-1 outline-white border
           rounded-[5px] focus:outline transition duration-300
            focus:outline-primary-7
           focus:border-0 placeholder:text-base 
           placeholder:text-grey-4 placeholder:font-normal
        placeholder:font-inter border-grey-1`}
      placeholder={placeholder}
      inputMode="numeric"
      name={name}
      autoComplete="off"
      value={value}
      onChange={onChange}
      maxLength={maxDigit}
    />
  );
}
