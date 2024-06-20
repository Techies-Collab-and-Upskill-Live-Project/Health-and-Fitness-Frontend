/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { OuterContainer } from "../../Containers";
import ScreenOverlay from "../../../../components/ScreenOverlay";
import { useGetQuery } from "../../../../hooks/useGetQuery";
import { DiaryContext } from "../../../../contexts/DiaryContext";
import { useCustomMutation } from "../../../../hooks/useCustomMutation";
import {
  createWaterIntake,
  updateWaterIntake,
} from "../../../../services/apiWaterIntake";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { InlineSpinner } from "../../../../components/InlineSpinner";
import { formatToBackendDate } from "../../../../utils/helpers";

export default function WaterIntakeSection() {
  return (
    <OuterContainer title="Water intake">
      <WaterIntake />
    </OuterContainer>
  );
}

export function WaterIntake() {
  const { data: waterIntake, status: waterIntakeStatus } =
    useGetQuery("waterIntake");

  const [getSettings, setGetSettings] = useState(false);

  const { setShowWaterSettings, step } = useContext(DiaryContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const date = new Date();
  date.setDate(date.getDate() + step);
  const resCode = waterIntakeStatus === 404 ? 201 : 200;
  const emptyIntakes =
    waterIntakeStatus === 404
      ? 6
      : waterIntake.number_of_glass <= 6
      ? 6 - waterIntake.number_of_glass
      : 0;

  const numberOfGlass =
    waterIntakeStatus === 404 ? 0 : waterIntake.number_of_glass;

  function handleClick() {
    setGetSettings((value) => !value);
  }

  function handleGetSettings() {
    setShowWaterSettings(true);
  }

  function onAddWater() {
    if (waterIntakeStatus === 404) {
      const waterIntakeData = {
        date: formatToBackendDate(date),
        number_of_glass: 1,
        water_goal: 0,
      };
      addwater(waterIntakeData);
    } else {
      const { water_goal, number_of_glass } = waterIntake;
      const newWaterIntake = {
        date: formatToBackendDate(date),
        water_goal,
        number_of_glass: number_of_glass + 1,
      };
      addwater(newWaterIntake);
    }
  }

  const { mutate: addwater, status: addWaterStatus } = useCustomMutation(
    waterIntakeStatus === 404 ? createWaterIntake : updateWaterIntake,
    async (data) => {
      /** If user's credentials are correct **/
      if (data.status == resCode) {
        queryClient.invalidateQueries({
          queryKey: ["waterIntake"],
        });
        toast.success("Successfully updated water intake");
      } else if (data.status == 401) {
        /** If user's credentials are not correct **/
        navigate("/log-in");
      } else if (data.status == 400) {
        /** If user does not provide one or more fields **/
        Object.entries(data.data).forEach(([fieldName, errorMessages]) => {
          try {
            errorMessages.forEach((errorMessage) => {
              toast.error(`${fieldName}: ${errorMessage}`); //Make toast
            });
          } catch {
            toast.error(`${errorMessages}`);
          }
        });
      }
    },
    (err) => toast.error(err.message)
  );

  function onRemoveWater() {
    const { water_goal, number_of_glass } = waterIntake;
    const newWaterIntake = {
      date: formatToBackendDate(date),
      water_goal,
      number_of_glass: number_of_glass - 1,
    };
    removeWater(newWaterIntake);
  }

  const { mutate: removeWater, status: removeWaterStatus } = useCustomMutation(
    updateWaterIntake,
    async (data) => {
      /** If user's credentials are correct **/
      if (data.status == resCode) {
        queryClient.invalidateQueries({
          queryKey: ["waterIntake"],
        });
        toast.success("Successfully updated water intake");
        setGetSettings(false);
      } else if (data.status == 401) {
        /** If user's credentials are not correct **/
        navigate("/log-in");
      } else if (data.status == 400) {
        /** If user does not provide one or more fields **/
        Object.entries(data.data).forEach(([fieldName, errorMessages]) => {
          try {
            errorMessages.forEach((errorMessage) => {
              toast.error(`${fieldName}: ${errorMessage}`); //Make toast
            });
          } catch {
            toast.error(`${errorMessages}`);
          }
        });
      }
    },
    (err) => toast.error(err.message)
  );

  return (
    <div
      className="flex flex-col justify-between w-full gap-3
       rounded border-grey-1 border p-3
       "
    >
      <div className="w-full flex justify-between items-center">
        <p
          className="font-inter text-grey-6 tracking-[0.3em]
            text-base font-normal leading-8"
        >
          {0.25 * numberOfGlass}L
        </p>
        <img
          onClick={handleClick}
          className="cursor-pointer"
          src="/Hamburger.svg"
          alt="Edit button"
        />
      </div>

      {addWaterStatus === "pending" || removeWaterStatus === "pending" ? (
        <ScreenOverlay>
          <div className="flex items-center justify-center w-full h-full">
            <InlineSpinner type="Updating water intake" />
          </div>
        </ScreenOverlay>
      ) : (
        getSettings && (
          <ScreenOverlay>
            <Modal numberOfGlass={numberOfGlass} textColor="text-grey-6">
              <div
                onClick={handleGetSettings}
                className="flex gap-2 text-grey-6 cursor-pointer"
              >
                <svg
                  width="22"
                  height="24"
                  viewBox="0 0 22 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.75 12C8.75 10.7574 9.75736 9.75002 11 9.75002C12.2426 9.75002 13.25 10.7574 13.25 12C13.25 13.2427 12.2426 14.25 11 14.25C9.75736 14.25 8.75 13.2427 8.75 12Z"
                    fill="#151425"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.58523 3.2323C8.56564 -0.203083 13.4342 -0.203084 14.4147 3.2323C14.7184 4.2967 15.812 4.92806 16.8857 4.65893C20.351 3.7903 22.7853 8.00664 20.3004 10.5734C19.5305 11.3687 19.5305 12.6314 20.3004 13.4266C22.7853 15.9934 20.351 20.2097 16.8857 19.3411C15.812 19.072 14.7184 19.7033 14.4147 20.7677C13.4342 24.2031 8.56564 24.2031 7.58523 20.7677C7.28146 19.7033 6.18792 19.072 5.11423 19.3411C1.6489 20.2097 -0.785401 15.9934 1.69952 13.4266C2.46944 12.6314 2.46944 11.3687 1.69952 10.5734C-0.785401 8.00664 1.6489 3.7903 5.11423 4.65893C6.18792 4.92806 7.28146 4.2967 7.58523 3.2323ZM11 8.25002C8.92893 8.25002 7.25 9.92895 7.25 12C7.25 14.0711 8.92893 15.75 11 15.75C13.0711 15.75 14.75 14.0711 14.75 12C14.75 9.92895 13.0711 8.25002 11 8.25002Z"
                    fill="#151425"
                  />
                </svg>
                Settings
              </div>
              {numberOfGlass === 0 ? null : (
                <>
                  <span className="w-full h-[0.3px] bg-grey-1"></span>
                  <div
                    onClick={onRemoveWater}
                    className="flex gap-2 text-accent-6 cursor-pointer"
                  >
                    <img src="/Trash.svg" alt="Delete Water" />
                    Delete
                  </div>
                </>
              )}
            </Modal>
          </ScreenOverlay>
        )
      )}
      <div className="w-full flex flex-wrap gap-2 items-center">
        {Array.from({ length: numberOfGlass }, (_, index) => (
          <WaterIntakeBox icon={"/cup.svg"} key={index} />
        ))}
        <WaterIntakeBox
          handleAddwater={onAddWater}
          style="cursor-pointer"
          icon={"/PlusBtn.svg"}
        />

        {Array.from({ length: emptyIntakes }, (_, index) => (
          <WaterIntakeBox key={index} />
        ))}
      </div>
    </div>
  );
}

function WaterIntakeBox({ handleAddwater = null, style, icon = null }) {
  return (
    <div
      onClick={handleAddwater}
      className="rounded bg-tomato-1 w-12 
  h-[58px] flex items-center justify-center"
    >
      {icon ? <img src={`${icon}`} alt={`${icon}`} className={style} /> : null}
    </div>
  );
}

function Modal({ numberOfGlass, children }) {
  return (
    <div
      className={`absolute w-40 ${
        numberOfGlass !== 0 && "h-[116px]"
      } rounded p-4 flex flex-col
     justify-center gap-3
    bg-white-4 bottom-[18%] right-[9%]`}
    >
      {children}
    </div>
  );
}