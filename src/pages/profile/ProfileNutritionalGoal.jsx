/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Button } from "../../components/Button";
import { ProfileContext } from "../../contexts/Profile";

export default function ProfileNutritionalGoal({ setShowGenderScreen }) {
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
                    href=""
                    className="inline-block px-6 py-0.5 text-white bg-success  active"
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
                <p className="text-xl font-normal font-montserrat text-grey-1 text-center">
                  Let&apos;s build your profile
                </p>
              </div>

              <div className="pb-12">
                <div className="font-semibold font-montserrat text-grey-6 text-2xl text-center">
                  What is your nutritional <br></br>goal
                </div>
              </div>
            </div>

            <div className="w-11/12 h-3/6  justify-center flex flex-col pl-4 ">
              <div className="pb-2">
                <Button
                  width="w-full"
                  height="h-12"
                  border={
                    profile.weight !== "Lose weight"
                      ? "border border-grey-1"
                      : ""
                  }
                  handleClick={() =>
                    setProfile((prev) => ({
                      ...prev,
                      weight: "Lose weight",
                    }))
                  }
                  bgColor={`transition duration-300 ${
                    profile.weight === "Lose weight"
                      ? "bg-primary-9"
                      : "bg-white-3"
                  }`}
                >
                  <p
                    className={
                      profile.weight === "Lose weight"
                        ? "text-white-4"
                        : "text-grey-4"
                    }
                  >
                    Lose Weight
                  </p>
                </Button>
              </div>
              <div className="pb-2">
                <Button
                  width="w-full"
                  height="h-12"
                  border={
                    profile.weight !== "Gain weight"
                      ? "border border-grey-1"
                      : ""
                  }
                  handleClick={() =>
                    setProfile((prev) => ({
                      ...prev,
                      weight: "Gain weight",
                    }))
                  }
                  bgColor={`transition duration-300 ${
                    profile.weight === "Gain weight"
                      ? "bg-primary-9"
                      : "bg-white-3"
                  }`}
                >
                  {" "}
                  <p
                    className={
                      profile.weight === "Gain weight"
                        ? "text-white-4"
                        : "text-grey-4"
                    }
                  >
                    Gain Weight
                  </p>
                </Button>
              </div>
              <div className="pb-2">
                <Button
                  width="w-full"
                  height="h-12"
                  border={
                    profile.weight !== "Maintain weight"
                      ? "border border-grey-1"
                      : ""
                  }
                  handleClick={() =>
                    setProfile((prev) => ({
                      ...prev,
                      weight: "Maintain weight",
                    }))
                  }
                  bgColor={`transition duration-300 ${
                    profile.weight === "Maintain weight"
                      ? "bg-primary-9"
                      : "bg-white-3"
                  }`}
                >
                  {" "}
                  <p
                    className={
                      profile.weight === "Maintain weight"
                        ? "text-white-4"
                        : "text-grey-4"
                    }
                  >
                    Maintain weight
                  </p>
                </Button>
              </div>
            </div>
            <div className="pt-4">
              <p className="font-normal font-montserrat text-xs text-grey-4 text-center">
                Did you know? Your nutritional goal should determine <br></br>
                what you eat and how you eat? <span> </span>
              </p>
            </div>
            <div className="w-11/12 h-3/6  justify-center flex flex-col pl-4 pb-4 pt-6">
              <Button
                isValid={profile.weight !== undefined}
                width="w-full"
                height="h-14"
                bgColor={`transition duration-300 ${
                  profile.weight !== undefined ? "bg-primary-9" : "bg-grey-1"
                }`}
                handleClick={() => setShowGenderScreen(true)}
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
