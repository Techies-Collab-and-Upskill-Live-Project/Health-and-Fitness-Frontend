import TopNavBar from "../TopNavBar";
import { Button } from "../../../components/Button";

import { Activities } from "./Activities";
import { useContext } from "react";
import { AccountContext } from "../../../contexts/Account";
import { useGetQuery } from "../../../hooks/useGetQuery";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../services/apiAccount";
import { useCustomMutation } from "../../../hooks/useCustomMutation";

export default function ActivityLevel() {
  return (
    <div className="p-4 flex flex-col gap-5 text-grey-5">
      <TopNavBar text="Activity Level" textColor="grey-5" />
      <Note />
      <Activities />
      <SaveBtn />
    </div>
  );
}

function Note() {
  return (
    <p className="font-semibold text-base">
      This takes into account what you do on a daily basis. Your activity level
      is used to suggest your daily calorie and water requirement
    </p>
  );
}

function SaveBtn() {
  const { selectedActivity } = useContext(AccountContext);
  const navigate = useNavigate();
  const { data } = useGetQuery("profile");
  const queryClient = useQueryClient();

  const { mutate: updateActivity, status: updateActivityStatus } =
    useCustomMutation(
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
      handleClick={() => {
        updateActivity({ activity_level: selectedActivity });
      }}
      isValid={selectedActivity !== data.activity_level}
      width="w-full"
      bgColor={`transition duration-300 ${
        selectedActivity !== data.activity_level ? "bg-primary-9" : "bg-grey-1"
      }`}
    >
      {updateActivityStatus === "pending" ? (
        <img className="w-8 h-8 animate-spin" src="/Loader.png" alt="Saving" />
      ) : (
        "Save changes"
      )}
    </Button>
  );
}
