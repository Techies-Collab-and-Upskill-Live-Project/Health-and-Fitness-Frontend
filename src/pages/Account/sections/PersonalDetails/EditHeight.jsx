/* eslint-disable react/prop-types */
import TopNavBar from "../../TopNavBar";
import { useGetQuery } from "../../../../hooks/useGetQuery";
import { updateProfile } from "../../../../services/apiAccount";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "../../../../hooks/useCustomMutation";
import { AccountContext } from "../../../../contexts/Account";

import toast from "react-hot-toast";
import { Button } from "../../../../components/Button";
import { useState, useContext } from "react";
import { WeightHeightInput } from "../../../../components/input-fields/WeightHeightInput";
import { MetricsOption } from "../../../../components/input-fields/MetricsOption";

export default function EditHeight() {
  const { data } = useGetQuery("profile");

  const [weightHeight, setWeightHeight] = useState({
    height: data.height,
  });
  const [weightHeightUnit, setWeightHeightUnit] = useState({
    height: data.height_unit,
  });

  return (
    <div className="p-4 flex flex-col gap-8 text-grey-5">
      <TopNavBar text="Weight" textColor="grey-5" />
      <WriteUp />
      <WeightInput
        weightHeight={weightHeight}
        weightHeightUnit={weightHeightUnit}
        setWeightHeight={setWeightHeight}
        setWeightHeightUnit={setWeightHeightUnit}
      />
      <SaveBtn
        weightHeightUnit={weightHeightUnit}
        weightHeight={weightHeight}
        setWeightHeightUnit={setWeightHeightUnit}
      />
    </div>
  );
}

function WeightInput({
  weightHeight,
  weightHeightUnit,
  setWeightHeight,
  setWeightHeightUnit,
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <WeightHeightInput
        value={weightHeight.height}
        onChange={(e) =>
          setWeightHeight((prev) => ({ ...prev, height: e.target.value }))
        }
        unit={weightHeightUnit.height}
      />
      <div className="flex gap-1">
        <MetricsOption
          handleClick={() => {
            if (weightHeightUnit.height === "Cm") return;
            setWeightHeight((prev) => ({
              ...prev,
              height: (prev.height * 30.48).toFixed(2),
            }));
            setWeightHeightUnit((prev) => ({
              ...prev,
              height: "Cm",
            }));
          }}
          value="Cm"
          isSelected={weightHeightUnit.height === "Cm"}
        />
        <MetricsOption
          handleClick={() => {
            if (weightHeightUnit.height === "Ft") return;
            setWeightHeight((prev) => ({
              ...prev,
              height: (prev.height / 30.48).toFixed(2),
            }));
            setWeightHeightUnit((prev) => ({
              ...prev,
              height: "Ft",
            }));
          }}
          value="Ft"
          isSelected={weightHeightUnit.height === "Ft"}
        />
      </div>
    </div>
  );
}

function WriteUp() {
  return (
    <p className="text-grey-6 font-semibold text-xl text-center">
      How much do you weigh right now?
    </p>
  );
}

function SaveBtn({ weightHeight, weightHeightUnit }) {
  const { setShowPersonalDetails, setShowEditWeight } =
    useContext(AccountContext);

  const navigate = useNavigate();
  const { data } = useGetQuery("profile");
  const queryClient = useQueryClient();

  function handleUpdateHeight() {
    updateHeight({
      height: weightHeight.height,
      height_unit: weightHeightUnit.height,
    });
  }

  const { mutate: updateHeight, status: updateHeightStatus } =
    useCustomMutation(
      updateProfile,
      async (data) => {
        /** If user's credentials are correct **/
        if (data.status == 200) {
          queryClient.invalidateQueries({
            queryKey: ["profile"],
          });
          toast.success("Successfully updated height");

          setShowPersonalDetails(true);
          setShowEditWeight(false);
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
      handleClick={handleUpdateHeight}
      isValid={
        updateHeightStatus !== "pending" &&
        (weightHeight.height !== data.height ||
          weightHeightUnit.height !== data.height_unit)
      }
      width="w-full"
      bgColor={`transition duration-300 ${
        updateHeightStatus !== "pending" &&
        (weightHeight.height !== data.height ||
          weightHeightUnit.height !== data.height_unit)
          ? "bg-primary-9"
          : "bg-grey-1"
      }`}
    >
      {updateHeightStatus === "pending" ? (
        <img className="w-8 h-8 animate-spin" src="/Loader.png" alt="Saving" />
      ) : (
        "Done"
      )}
    </Button>
  );
}
