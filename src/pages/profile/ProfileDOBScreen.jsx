/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Button } from "../../components/Button";
import { ProfileContext } from "../../contexts/Profile";

export default function ProfileDOBScreen({ setshowWeightScreen }) {
  const [dayValue, setDayValue] = useState(null);
  const [monthValue, setMonthValue] = useState(null);
  const [yearValue, setYearValue] = useState(null);

  const { setProfile } = useContext(ProfileContext);

  function handleNextBTN() {
    setProfile((prev) => ({
      ...prev,
      dob: `${dayValue}-${monthValue}-${yearValue}`,
    }));
    setshowWeightScreen(true);
  }

  return (
    <div>
      <div
        className="px-4 pt-4 pb-7 grid gap-3.5 grid-rows-[1.5fr_1fr] 
      bg-primary-1 my-0 mx-auto max-w-screen-sm w-screen h-[100dvh] font-montserrat"
      >
        <div className="grid content-between">
          <img src="/Logo plain background.svg" alt="FudHouse logo" />
        </div>
        <div className="max-w-screen-sm w-screen h-dvh fixed">
          <div className="pt-10">
            <div className="w-11/12 h-3/6 ">
              <ul className=" justify-center flex flex-grow dark:text-gray-400 ">
                <li className="me-2">
                  <a
                    href="#"
                    className="inline-block px-6 py-0.5 text-white bg-success  active"
                    aria-current="page"
                  ></a>
                </li>
                <li className="me-2">
                  <a
                    href="#"
                    className="inline-block  px-6 py-0.5 text-white bg-success  active"
                    aria-current="page"
                  ></a>
                </li>
                <li className="me-2">
                  <a
                    href="#"
                    className="inline-block  px-6 py-0.5 text-white bg-success inactive"
                    aria-current="page"
                  ></a>
                </li>
                <li className="me-2">
                  <a
                    href="#"
                    className="inline-block  px-6 py-0.5 text-white bg-grey-1  inactive"
                    aria-current="page"
                  ></a>
                </li>
                <li className="me-2">
                  <a
                    href="#"
                    className="inline-block px-6 py-0.5 text-white bg-grey-1 inactive"
                    aria-current="page"
                  ></a>
                </li>
                <li className="me-2">
                  <a
                    href="#"
                    className="inline-block px-6 py-0.5 text-white bg-grey-1 inactive"
                    aria-current="page"
                  ></a>
                </li>
              </ul>

              <div className="pt-5 pb-8">
                <p className="text-xl font-normal text-grey-4 text-center">
                  Let&apos;s build your profile
                </p>
              </div>

              <div className="pb-12">
                <div className="font-semibold text-grey-6 text-2xl text-center">
                  Your date of Birth
                </div>
              </div>
            </div>

            <div className="h-60 flex items-center justify-center w-full gap-1">
              <DOBInput
                placeholder="DD"
                name="Day"
                value={dayValue}
                onChange={(e) => setDayValue(e.target.value)}
                maxDigit={2}
              />
              <DOBInput
                placeholder="MM"
                name="Month"
                value={monthValue}
                onChange={(e) => setMonthValue(e.target.value)}
                maxDigit={2}
              />
              <DOBInput
                placeholder="YYYY"
                name="Year"
                value={yearValue}
                onChange={(e) => setYearValue(e.target.value)}
                maxDigit={4}
                width={62}
              />
            </div>
            <p className="font-normal text-xs text-grey-4 text-center mt-4">
              Did you know? Your age determines your calorie need<br></br> and
              the amount of calorie your <br></br>body is able to burn.
            </p>
            <div className="w-11/12 h-3/6  justify-center flex flex-col pl-4 pb-4 pt-6">
              <Button
                isValid={dayValue && monthValue && yearValue}
                width="w-full"
                height="h-14"
                bgColor={`transition duration-300 ${
                  dayValue && monthValue && yearValue
                    ? "bg-primary-9"
                    : "bg-grey-1"
                }`}
                handleClick={handleNextBTN}
              >
                {" "}
                <p className="text-white-4">Next</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DOBInput({
  width = 43,
  placeholder,
  name,
  value,
  onChange,
  maxDigit,
}) {
  return (
    <input
      required
      className={`text-center h-10 
        text-sm font-medium text-grey-6
          w-[${width}px] bg-white-3 outline-1 outline-white border
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
