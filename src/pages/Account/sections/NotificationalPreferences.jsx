/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import TopNavBar from "../TopNavBar";
import { Preferences } from "./Preferences";
import { Button } from "../../../components/Button";

import { AccountContext } from "../../../contexts/Account";
import { useGetQuery } from "../../../hooks/useGetQuery";
import { useCustomMutation } from "../../../hooks/useCustomMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updatePreferences } from "../../../services/apiAccount";

export default function NotificationalPreferences() {
  return (
    <div className="p-4 flex flex-col gap-4 text-grey-5">
      <TopNavBar text="Notificational Preferences" textColor="grey-5" />
      <Preferences />
      <SaveBtn />
    </div>
  );
}

function SaveBtn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [changes, setChanges] = useState({});

  const initialRender = useRef(true);

  const { preferences } = useContext(AccountContext);

  const { data: preferenceData } = useGetQuery("preferences");

  const { mutate: update, status: updateStatus } = useCustomMutation(
    updatePreferences,
    async (data) => {
      /** If user's credentials are correct **/
      if (data.status == 200) {
        queryClient.invalidateQueries({
          queryKey: ["preferences"],
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

  useEffect(() => {
    // Skip the first render
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const newChanges = {};

    for (const key in preferenceData) {
      if (preferenceData[key] !== preferences[key]) {
        newChanges[key] = preferences[key];
      }
    }
    setChanges(newChanges);
  }, [preferenceData, preferences]);

  function handleClick() {
    if (Object.keys(changes).length !== 0) {
      update(changes);
    }
  }

  return (
    <Button
      mt="mt-3"
      handleClick={handleClick}
      isValid={updateStatus !== "pending" && Object.keys(changes).length !== 0}
      width="w-full"
      bgColor={`${
        updateStatus !== "pending" && Object.keys(changes).length !== 0
          ? "bg-primary-9"
          : "bg-grey-1"
      }`}
    >
      {updateStatus === "pending" ? (
        <img className="w-8 h-8 animate-spin" src="/Loader.png" alt="Saving" />
      ) : (
        "Save changes"
      )}
    </Button>
  );
}
