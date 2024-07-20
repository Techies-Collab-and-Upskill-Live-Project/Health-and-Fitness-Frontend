/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Button } from "../../components/Button";

import { ProfileContext } from "../../contexts/Profile";

export default function ProfileGenderScreen({ setshowDOBScreen }) {
  const { profile, setProfile } = useContext(ProfileContext);

  return (
    <div>
      <div
        className="px-4 pt-4 pb-7 grid gap-3.5 grid-rows-[1.5fr_1fr] 
      bg-primary-1 my-0 mx-auto max-w-screen-sm w-screen h-[100dvh]"
      >
        <div className="grid content-between">
          <img src="/Logo plain background.svg" alt="FudHouse logo" />
        </div>
        <div className="max-w-screen-sm w-screen h-[100dvh] fixed">
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
                    className="inline-block  px-6 py-0.5 text-white bg-grey-1  active"
                    aria-current="page"
                  ></a>
                </li>
                <li className="me-2">
                  <a
                    href="#"
                    className="inline-block  px-6 py-0.5 text-white bg-grey-1  active"
                    aria-current="page"
                  ></a>
                </li>
                <li className="me-2">
                  <a
                    href="#"
                    className="inline-block px-6 py-0.5 text-white bg-grey-1 active"
                    aria-current="page"
                  ></a>
                </li>
                <li className="me-2">
                  <a
                    href="#"
                    className="inline-block px-6 py-0.5 text-white bg-grey-1 active"
                    aria-current="page"
                  ></a>
                </li>
              </ul>

              <div className="pt-5 pb-8">
                <p className="text-xl font-normal font-montserrat text-grey-4 text-center">
                  Let&apos;s build your profile
                </p>
              </div>

              <div className="pb-12">
                <div className="font-semibold font-montserrat text-grey-6 text-2xl text-center">
                  What is your Sex?
                </div>
              </div>
            </div>

            <div className="w-11/12 h-3/6  justify-center flex flex-col pl-4 ">
              <div className="pb-2">
                <Button
                  width="w-full"
                  height="h-12"
                  border={
                    profile.gender !== "Male" ? "border border-grey-1" : ""
                  }
                  handleClick={() =>
                    setProfile((prev) => ({ ...prev, gender: "Male" }))
                  }
                  bgColor={`transition duration-300 ${
                    profile.gender === "Male" ? "bg-primary-9" : "bg-white-3"
                  }`}
                >
                  <p
                    className={
                      profile.gender === "Male" ? "text-white-4" : "text-grey-4"
                    }
                  >
                    Male
                  </p>
                </Button>
              </div>
              <div className="pb-2">
                <Button
                  width="w-full"
                  height="h-12"
                  border={
                    profile.gender !== "Female" ? "border border-grey-1" : ""
                  }
                  handleClick={() =>
                    setProfile((prev) => ({ ...prev, gender: "Female" }))
                  }
                  bgColor={`transition duration-300 ${
                    profile.gender === "Female" ? "bg-primary-9" : "bg-white-3"
                  }`}
                >
                  {" "}
                  <p
                    className={
                      profile.gender === "Female"
                        ? "text-white-4"
                        : "text-grey-4"
                    }
                  >
                    Female
                  </p>
                </Button>
              </div>
            </div>
            <div className="pt-4">
              <p className="font-normal font-montserrat text-xs text-grey-4 text-center">
                Did you know? Your sex determines your calorie <br></br>need and
                the amount of calorie your <br></br>
                body is able to burn. <span> </span>
              </p>
            </div>
            <div className="w-11/12 h-3/6  justify-center flex flex-col pl-4 pb-4 pt-6">
              <Button
                isValid={profile.gender !== undefined}
                width="w-full"
                height="h-14"
                 handleClick={() => setshowDOBScreen(true)}
                bgColor={`transition duration-300 ${
                  profile.gender !== undefined ? "bg-primary-9" : "bg-grey-1"
                }`}
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
