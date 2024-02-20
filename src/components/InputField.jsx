import { useState } from "react";

/* eslint-disable react/prop-types */
export function InputField({
  type = "text",
  name,
  label,
  placeholder,
  paddingLeft = "pl-[42px]",
  title,
  children,
}) {
  const [value, setValue] = useState("");
  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <div className="grid auto-rows-max gap-2 h-[74px] text-grey-5">
      <label className="relative grid auto-rows-max gap-2 h-[74px] text-grey-5">
        <span className="text-xs font-medium">{label}</span>
        {children}
        <input
          required
          className={`block h-12 opacity-0.5 py-4 pr-[10px] ${paddingLeft} w-full bg-transparent border
           rounded-lg shadow-sm active:border-primary-7
          placeholder:text-xs placeholder:text-grey-5 placeholder:font-medium
        placeholder:font-montserrat`}
          placeholder={placeholder}
          title={title}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
