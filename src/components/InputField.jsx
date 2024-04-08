import PasswordRequirement from "./PasswordRequirement";

/* eslint-disable react/prop-types */
export function InputField({
  type = "text",
  name,
  label,
  placeholder,
  paddingLeft = "pl-[42px]",
  title,
  value,
  onChange,
  onFocus,
  onKeyUp,
  isValidEmail = false,
  isValidName = false,
  isValidPassword = false,
  focused,
  errorText,
  children,
}) {
  return (
    <div className="grid auto-rows-max gap-2 text-grey-5">
      <label className="relative grid auto-rows-max gap-2 text-grey-5">
        <span className="text-xs font-medium">{label}</span>
        {children}
        <input
          required
          className={`block h-12 opacity-0.5 py-4 pr-[10px] ${paddingLeft} 
          w-full bg-transparent outline-1 outline-white border
           rounded-lg focus:outline-none transition ${
             value.length < 1 || isValidEmail || isValidName || isValidPassword
               ? "focus:outline-primary-7"
               : "focus:outline-tomato-7"
           } focus:border-0
          placeholder:text-xs placeholder:text-grey-5 placeholder:font-medium
        placeholder:font-montserrat border-grey-5`}
          placeholder={placeholder}
          title={title}
          type={type}
          name={name}
          autoComplete="off"
          value={value}
          onChange={onChange}
          onFocus={() => onFocus(true)}
          onBlur={() => onFocus(false)}
          onKeyUp={onKeyUp}
        />
      </label>
      <>{errorText}</>
      {focused &&
        title ===
          "Enter a strong password (at least 8 characters including uppercase, lowercase, digits, and special characters)" && (
          <div className="mb-2 flex flex-col gap-1 text-xs">
            <PasswordRequirement
              condition={value.length > 6}
              text={<span> A minimum of 8 characters</span>}
            />
            <PasswordRequirement
              condition={/[A-Z]/.test(value)}
              text={<span> Must contain 1 uppercase letter(A-Z)</span>}
            />
            <PasswordRequirement
              condition={/[a-z]/.test(value)}
              text={<span> Must contain 1 lowercase letter(a-z)</span>}
            />
            <PasswordRequirement
              condition={/[!@#$%&*]/.test(value)}
              text={<span> Must contain symbol[!@#$%&*]</span>}
            />
            <PasswordRequirement
              condition={/\d/.test(value)}
              text={<span> Must contain numbers</span>}
            />
          </div>
        )}
    </div>
  );
}
