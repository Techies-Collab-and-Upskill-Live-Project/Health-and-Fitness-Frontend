import { useContext, useState } from "react";
import { useGetQuery } from "../../../../hooks/useGetQuery";
import {
  createWaterIntake,
  updateWaterIntake,
} from "../../../../services/apiWaterIntake";
import { formatToBackendDate } from "../../../../utils/helpers";
import { DiaryContext } from "../../../../contexts/DiaryContext";
import { useCustomMutation } from "../../../../hooks/useCustomMutation";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DraggableProgressBar = () => {
  const { step } = useContext(DiaryContext);
  const date = new Date();
  date.setDate(date.getDate() + step);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: waterIntake, status: waterIntakeStatus } =
    useGetQuery("waterIntake");

  const resCode = waterIntakeStatus === 404 ? 201 : 200;
  const [value, setValue] = useState(
    waterIntakeStatus === 404 ? 0 : waterIntake.water_goal / 0.04
  );

  const handleChange = (event) => {
    setValue(event.target.value);
    const { number_of_glass } = waterIntake;
    const newWaterIntake = {
      date: formatToBackendDate(date),
      water_goal: parseFloat((event.target.value * 0.04).toFixed(2)),
      number_of_glass: waterIntakeStatus === 404 ? 0 : number_of_glass,
    };
    updateWaterGoal(newWaterIntake);
  };

  const { mutate: updateWaterGoal } = useCustomMutation(
    waterIntakeStatus === 404 ? createWaterIntake : updateWaterIntake,
    async (data) => {
      /** If user's credentials are correct **/
      if (data?.status == resCode) {
        queryClient.invalidateQueries({
          queryKey: ["waterIntake"],
        });
      } else if (data?.status == 401) {
        /** If user's credentials are not correct **/
        navigate("/log-in");
      } else if (data?.status == 400) {
        /** If user does not provide one or more fields **/
        Object.entries(data?.data).forEach(([fieldName, errorMessages]) => {
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
    <input
      type="range"
      min="0"
      max="100"
      step="0.04"
      value={value}
      onChange={handleChange}
      className="w-full h-1 bg-grey-1 rounded-lg appearance-none cursor-pointer"
      style={{
        background: `linear-gradient(to right, #FFA500 0%, #FFA500 ${value}%, #D0D0D3 ${value}%, #D0D0D3 100%)`,
      }}
    />
  );
};

export default DraggableProgressBar;
