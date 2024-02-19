import { InputField } from "./InputField";

export function SignUpForm() {
  return (
    <form className="mt-6 h-[476px] w-full">
      <div className="grid auto-rows-max gap-4 h-[344px]">
        <InputField
          name="fname"
          label="Full name"
          placeholder="Enter full name"
          pattern="^[A-Za-z\s'\-]+$"
          title="Enter a valid full name (letters, spaces, hyphens, and apostrophes only)"
        >
          <svg
            className="absolute left-[10px] flex items-center justify-center bottom-[14px]"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.6854 19.0971C20.5721 17.3191 21.75 14.7971 21.75 12C21.75 6.61522 17.3848 2.25 12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 14.7971 3.42785 17.3191 5.31463 19.0971C7.06012 20.7419 9.41234 21.75 12 21.75C14.5877 21.75 16.9399 20.7419 18.6854 19.0971ZM6.14512 17.8123C7.51961 16.0978 9.63161 15 12 15C14.3684 15 16.4804 16.0978 17.8549 17.8123C16.3603 19.3178 14.289 20.25 12 20.25C9.711 20.25 7.63973 19.3178 6.14512 17.8123ZM15.75 9C15.75 11.0711 14.0711 12.75 12 12.75C9.92893 12.75 8.25 11.0711 8.25 9C8.25 6.92893 9.92893 5.25 12 5.25C14.0711 5.25 15.75 6.92893 15.75 9Z"
              fill="#63626E"
            />
          </svg>
        </InputField>
        <InputField
          type="email"
          name="email"
          label="Email"
          placeholder="Enter email address"
          pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
          title="Enter a valid email address"
        >
          <svg
            className="absolute left-[10px] flex items-center justify-center bottom-[17px]"
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 5.6691V14.25C0.5 15.9069 1.84315 17.25 3.5 17.25H18.5C20.1569 17.25 21.5 15.9069 21.5 14.25V5.6691L12.5723 11.1631C11.6081 11.7564 10.3919 11.7564 9.42771 11.1631L0.5 5.6691Z"
              fill="#63626E"
            />
            <path
              d="M21.5 3.90783V3.75C21.5 2.09315 20.1569 0.75 18.5 0.75H3.5C1.84315 0.75 0.5 2.09315 0.5 3.75V3.90783L10.2139 9.88558C10.696 10.1823 11.304 10.1823 11.7861 9.88558L21.5 3.90783Z"
              fill="#63626E"
            />
          </svg>
        </InputField>
        <InputField
          name="username"
          label="User name"
          placeholder="Enter user name"
          pattern="^(?=(?:.*[a-z]){0,1})(?=(?:.*[A-Z]){0,1})(?=(?:.*\d){0,1})[a-zA-Z0-9]{3,}$"
          title="Enter a valid username"
        >
          <svg
            className="absolute left-[10px] flex items-center justify-center bottom-[14px]"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.6854 19.0971C20.5721 17.3191 21.75 14.7971 21.75 12C21.75 6.61522 17.3848 2.25 12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 14.7971 3.42785 17.3191 5.31463 19.0971C7.06012 20.7419 9.41234 21.75 12 21.75C14.5877 21.75 16.9399 20.7419 18.6854 19.0971ZM6.14512 17.8123C7.51961 16.0978 9.63161 15 12 15C14.3684 15 16.4804 16.0978 17.8549 17.8123C16.3603 19.3178 14.289 20.25 12 20.25C9.711 20.25 7.63973 19.3178 6.14512 17.8123ZM15.75 9C15.75 11.0711 14.0711 12.75 12 12.75C9.92893 12.75 8.25 11.0711 8.25 9C8.25 6.92893 9.92893 5.25 12 5.25C14.0711 5.25 15.75 6.92893 15.75 9Z"
              fill="#63626E"
            />
          </svg>
        </InputField>
        <InputField
          type="password"
          name="password"
          label="Password"
          placeholder="Enter password here"
          paddingLeft="pl-4"
          pattern="/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/"
          title="Enter a strong password (at least 8 characters including uppercase, lowercase, digits, and special characters)"
        >
          <svg
            className="absolute right-4 flex items-center justify-center bottom-[14px]"
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.9799 6.22257C2.05679 7.31382 1.35239 8.59601 0.934326 10.0015C2.22562 14.338 6.24308 17.5 10.9991 17.5C11.9916 17.5 12.952 17.3623 13.8622 17.1049M5.2276 4.22763C6.88385 3.13558 8.86768 2.5 10.9999 2.5C15.7559 2.5 19.7734 5.66205 21.0647 9.99852C20.3528 12.3919 18.8105 14.4277 16.772 15.772M5.2276 4.22763L1.99997 1M5.2276 4.22763L8.87865 7.87868M16.772 15.772L20 19M16.772 15.772L13.1213 12.1213M13.1213 12.1213C13.6642 11.5784 14 10.8284 14 10C14 8.34315 12.6568 7 11 7C10.1715 7 9.42154 7.33579 8.87865 7.87868M13.1213 12.1213L8.87865 7.87868"
              stroke="#151425"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </InputField>
      </div>
      <div className="mt-6 h-[84px]"></div>
    </form>
  );
}
