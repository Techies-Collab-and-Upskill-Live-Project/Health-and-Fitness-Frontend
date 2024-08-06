/* eslint-disable react/prop-types */

import { useGetQuery } from "../../../../hooks/useGetQuery";
import { roundUp } from "../../../../utils/helpers";

import { InnerContainer, OuterContainer } from "../../Containers";
import { Modal } from "../MealSection/MealSection";

import ScreenOverlay from "../../../../components/ScreenOverlay";
import SmallModal from "../../../../components/SmallModal";
import { useContext, useState } from "react";
import { DiaryContext } from "../../../../contexts/DiaryContext";
import { useCustomMutation } from "../../../../hooks/useCustomMutation";
import { deleteUserExercise } from "../../../../services/apiExercise";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { InlineSpinner } from "../../../../components/InlineSpinner";

export default function ExerciseSection() {
  const { data: exerciseData, status: exerciseStatus } =
    useGetQuery("exercises");
  const { setShowAddExercise } = useContext(DiaryContext);

  return (
    <OuterContainer
      handleClick={() => {
        setShowAddExercise(true);
      }}
      title="Exercises"
    >
      {exerciseStatus === 404 ? (
        <InnerContainer
          isEmpty={exerciseStatus === 404}
          image_url={"/exercise.png"}
          name="Exercise"
        />
      ) : (
        <>
          {exerciseData.map((exercise) => {
            return (
              <Exercise
                exercise={exercise}
                id={exercise.id}
                key={exercise.id}
              />
            );
          })}
        </>
      )}
    </OuterContainer>
  );
}

export function Exercise({ exercise, id }) {
  const { exerciseModalID, setExerciseModalID } = useContext(DiaryContext);

  return (
    <InnerContainer
      handleHamburgerClick={() => setExerciseModalID(id)}
      image_url={"/exercise.png"}
      name="Exercise"
    >
      <div className="flex flex-col h-[60px] justify-end">
        <p className="flex items-center justify-center gap-2">
          <span>{exercise.name}</span>
          <img src="/Flame.svg" alt="Burned calorie" />{" "}
          <span>
            {roundUp(
              exercise.time_spent * parseFloat(exercise.energy_per_minute)
            )}{" "}
            kcal
          </span>
        </p>
      </div>
      {exerciseModalID === id && (
        <ScreenOverlay>
          <DeleteExerciseBtn id={id} handleCancel={setExerciseModalID} />
        </ScreenOverlay>
      )}
    </InnerContainer>
  );
}

function DeleteExerciseBtn({ id, handleCancel }) {
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  function onCancel() {
    handleCancel(null);
  }

  const { mutate, status } = useCustomMutation(
    deleteUserExercise,
    async (data) => {
      /** If user's credentials are correct **/
      if (data.status == 204) {
        queryClient.invalidateQueries({
          queryKey: ["exercises"],
        });
        toast.success("Successfully deleted exercise");
        onCancel();
        setIsConfirmDelete(false);
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

  function handleDeleteExercise() {
    mutate(id);
  }

  return (
    <>
      {status === "pending" ? (
        <div className="flex items-center justify-center w-full h-full">
          <InlineSpinner type="Deleting exercise" />
        </div>
      ) : isConfirmDelete ? (
        <Modal
          handleAction={handleDeleteExercise}
          handleCancel={onCancel}
          title={"Delete Exercise?"}
          bg={"bg-accent-1"}
          action={"Delete"}
          actionColor={"accent-6"}
        >
          <p className="text-grey-4 font-medium text-[11px] leading-[18px]">
            Exercise will be permanently removed from your diary.
          </p>
        </Modal>
      ) : (
        <SmallModal
          handleClick={() => setIsConfirmDelete((initValue) => !initValue)}
          textColor={"text-accent-6"}
        >
          <img src="/Trash.svg" alt="Delete Meal" />
          Delete
        </SmallModal>
      )}
    </>
  );
}
