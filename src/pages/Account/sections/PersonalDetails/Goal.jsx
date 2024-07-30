/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import TopNavBar from "../../TopNavBar";
import { AccountContext } from "../../../../contexts/Account";
import { useGetQuery } from "../../../../hooks/useGetQuery";
import { Goals } from "./Goals";
import { updateProfile } from "../../../../services/apiAccount";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "../../../../hooks/useCustomMutation";
import toast from "react-hot-toast";
import { Button } from "../../../../components/Button";

export default function Goal() {
  const { setSelectedGoal } = useContext(AccountContext);
  const { data } = useGetQuery("profile");

  useEffect(() => {
    setSelectedGoal(data.nutritional_goal);
  }, [setSelectedGoal, data.nutritional_goal]);

  return (
    <div className="p-4 flex flex-col gap-4 text-grey-5">
      <TopNavBar text="My Goal" textColor="grey-5" />
      <WriteUp />
      <Goals />
      <SaveBtn />
    </div>
  );
}

function WriteUp() {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold text-black text-sm">
        Your nutritional goal determines the amount of calories your body needs
      </p>
      <p className="text-grey-4 font-medium text-[11px] leading-[18px]">
        We use your goal to calculate your nutritional needs
      </p>
    </div>
  );
}

function SaveBtn() {
  const { selectedGoal } = useContext(AccountContext);
  const navigate = useNavigate();
  const { data } = useGetQuery("profile");
  const queryClient = useQueryClient();

  const { mutate: updateGoal, status: updateGoalStatus } = useCustomMutation(
    updateProfile,
    async (data) => {
      /** If user's credentials are correct **/
      if (data.status == 200) {
        queryClient.invalidateQueries({
          queryKey: ["profile"],
        });
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
    <Button
      mt="mt-[50px]"
      handleClick={() => {
        updateGoalStatus !== "pending" &&
          updateGoal({ nutritional_goal: selectedGoal });
      }}
      isValid={selectedGoal !== data.nutritional_goal}
      width="w-full"
      bgColor={`transition duration-300 ${
        updateGoalStatus !== "pending" && selectedGoal !== data.nutritional_goal
          ? "bg-primary-9"
          : "bg-grey-1"
      }`}
    >
      {updateGoalStatus === "pending" ? (
        <img className="w-8 h-8 animate-spin" src="/Loader.png" alt="Saving" />
      ) : (
        "Done"
      )}
    </Button>
  );
}
