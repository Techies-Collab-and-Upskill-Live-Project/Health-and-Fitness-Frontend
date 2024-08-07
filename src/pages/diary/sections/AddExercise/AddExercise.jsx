/* eslint-disable react/prop-types */

import { useContext, useState } from "react";

import { DiaryContext } from "../../../../contexts/DiaryContext";
import { MainWrapper } from "../../MainWrapper";
import { AddBtn } from "../../../../components/AddBtn";
import { Modal } from "../MealSection/MealSection";

import TopNavBar from "../../TopNavBar";
import ScreenOverlay from "../../../../components/ScreenOverlay";
import TimePicker from "../../../../components/TimePicker";
import { useCustomMutation } from "../../../../hooks/useCustomMutation";
import { createUserExercise } from "../../../../services/apiExercise";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { formatToBackendDate } from "../../../../utils/helpers";
import { InlineSpinner } from "../../../../components/InlineSpinner";

export default function AddExercise() {
  return (
    <MainWrapper id={1}>
      <TopNavBar
        bg="primary-9"
        iconFill="white-3"
        iconStroke="grey-6"
        text="Exercises"
        textColor="white-3"
      />
      <div
        className="w-full min-h-[650px] h-custom-dvh overflow-y-auto px-4 
          flex flex-col items-center font-montserrat bg-white-3"
      >
        <Heading />
        <DefaultExercises />
        <Note />
      </div>
    </MainWrapper>
  );
}

function Heading() {
  function AddExerciseManually() {
    // Pass
  }

  return (
    <div className="flex w-full items-center justify-between mt-4">
      <p className="text-grey-6 text-[19px] font-semibold">Input exercise</p>
      <div className="cursor-pointer " onClick={AddExerciseManually}>
        <AddBtn />
      </div>
    </div>
  );
}

function DefaultExercises() {
  const { exerciseObject } = useContext(DiaryContext);
  return (
    <div className="mt-4 w-full border-grey-1 min-h-[461px] bg-white-4 rounded border flex flex-col justify-between p-4">
      {exerciseObject.map((exercise) => {
        return (
          <ExerciseOption
            id={exercise.id}
            key={exercise.id}
            name={exercise.name}
            timeSpent={exercise.time_spent}
            energyPerMinute={exercise.energy_per_minute}
          />
        );
      })}
    </div>
  );
}

function ExerciseOption({ id, name, timeSpent, energyPerMinute }) {
  const { currentExerciseId, setCurrentExerciseId } = useContext(DiaryContext);

  return (
    <>
      <div className="flex w-full justify-between items-center">
        <div className="flex gap-4 items-center">
          <div
            className="h-[31px] w-[31px] flex items-center justify-center 
          rounded-1 shadow-[0px_0px_8px_2px_#0000001A]"
          >
            <img src={`/${name}.png`} alt={name} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-grey-6 font-medium text-base">{name}</p>
            <div className="flex gap-3 text-[11px] font-normal leading-[17px] text-grey-4">
              <p>{timeSpent} mins</p>
              <p className="flex gap-[2px] items-center">
                <svg
                  width="10"
                  height="13"
                  viewBox="0 0 10 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.04995 5.96682C8.8857 5.76682 8.68574 5.59348 8.50006 5.42014C8.02157 5.02013 7.47881 4.73345 7.02175 4.31344C5.95766 3.34008 5.72199 1.73337 6.40044 0.5C5.72199 0.653338 5.12924 1.00001 4.62219 1.38003C2.77253 2.76673 2.04409 5.21347 2.91536 7.31353C2.94393 7.3802 2.9725 7.44686 2.9725 7.53353C2.9725 7.6802 2.86537 7.81354 2.72254 7.86688C2.55829 7.93355 2.38689 7.89354 2.2512 7.78687C2.21042 7.7554 2.17649 7.71693 2.15122 7.67354C1.34422 6.72018 1.21567 5.35347 1.75843 4.26011C0.565794 5.1668 -0.0840869 6.70018 0.00875321 8.14688C0.0516025 8.48023 0.0944518 8.81357 0.215858 9.14691C0.31584 9.54692 0.508662 9.94694 0.722908 10.3003C1.4942 11.4536 2.82967 12.2803 4.26512 12.447C5.79341 12.627 7.42882 12.367 8.60004 11.3803C9.90694 10.2736 10.364 8.50023 9.69269 6.98018L9.59985 6.80685C9.44988 6.50017 9.04995 5.96682 9.04995 5.96682ZM6.79323 10.1669C6.59326 10.3269 6.26475 10.5003 6.00765 10.567C5.2078 10.8336 4.40795 10.4603 3.93661 10.0203C4.78645 9.8336 5.2935 9.24691 5.44347 8.65357C5.56488 8.12022 5.33635 7.6802 5.24351 7.16686C5.15781 6.67351 5.17209 6.2535 5.36492 5.79348C5.5006 6.04682 5.64344 6.30017 5.81483 6.50017C6.36473 7.16686 7.22886 7.4602 7.41454 8.36689C7.44311 8.46023 7.45739 8.55356 7.45739 8.65357C7.47881 9.20025 7.22172 9.80026 6.79323 10.1669Z"
                    fill="#FF6347"
                  />
                </svg>
                <span>{Math.ceil(timeSpent * energyPerMinute)} kcal</span>
              </p>
            </div>
          </div>
        </div>
        <div
          onClick={() => setCurrentExerciseId(id)}
          className="h-full flex justify-center items-center"
        >
          <img
            className="cursor-pointer"
            src="/Hamburger.svg"
            alt="Edit exercise"
          />
        </div>
      </div>
      {currentExerciseId === id && (
        <ScreenOverlay dissmissable={true}>
          <EditExerciseBtn id={id} />
        </ScreenOverlay>
      )}
    </>
  );
}

function SmallModal({ children }) {
  return (
    <div
      className={`absolute  rounded p-4 flex flex-col
     justify-center text-grey-6 items-center gap-3
    bg-white-4 right-[30%] left-[30%]  top-[40%]`}
    >
      {children}
    </div>
  );
}

function EditTime() {
  const {
    setCurrentExerciseId,
    currentExerciseId,
    setExerciseObject,
    selectedExerciseTime,
  } = useContext(DiaryContext);

  function onCancel() {
    setCurrentExerciseId(null);
  }

  function onSave() {
    setExerciseObject((prevItems) => {
      const newItems = [...prevItems];
      newItems[currentExerciseId] = {
        ...newItems[currentExerciseId],
        time_spent: selectedExerciseTime,
      };
      return newItems;
    });
    setCurrentExerciseId(null);
  }
  return (
    <Modal
      handleAction={onSave}
      handleCancel={onCancel}
      title="Edit time"
      action="Save"
      bg="bg-primary-1"
      actionColor="primary-9"
    >
      <TimePicker id={currentExerciseId} />
    </Modal>
  );
}

function EditExerciseBtn() {
  const date = new Date();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { exerciseObject, currentExerciseId, step, setCurrentExerciseId } =
    useContext(DiaryContext);

  const [showEditTime, setShowEditTime] = useState(false);

  date.setDate(date.getDate() + step);

  const { mutate, status } = useCustomMutation(
    createUserExercise,
    async (data) => {
      /** If user's credentials are correct **/
      if (data.status == 201) {
        queryClient.invalidateQueries({
          queryKey: ["exercises"],
        });
        toast.success("Successfully created exercise");
        setCurrentExerciseId(null);
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

  function handleAddExercise() {
    const { id, ...rest } = exerciseObject[currentExerciseId];
    const newExerciseData = {
      ...rest,
      date: formatToBackendDate(date),
    };
    mutate(newExerciseData);
  }

  return (
    <>
      {status === "pending" ? (
        <div className="flex items-center justify-center w-full h-full">          
          <InlineSpinner type="Creating exercise" />
        </div>
      ) : showEditTime ? (
        <EditTime />
      ) : (
        <SmallModal>
          <div
            onClick={handleAddExercise}
            className="h-[30px] w-full flex items-center gap-2 cursor-pointer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 1.5V16.5M16.5 9L1.5 9"
                stroke="#3C3B49"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Add Exercise
          </div>
          <span className="w-full h-[0.3px] bg-grey-1"></span>
          <div
            onClick={() => setShowEditTime((initialValue) => !initialValue)}
            className="flex w-full h-[30px] justify-start items-center gap-2 cursor-pointer"
          >
            <svg
              width="15"
              height="18"
              viewBox="0 0 15 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.2041 1.5755L11.2941 1.6275C12.0723 2.07671 12.7211 2.4513 13.1962 2.81795C13.6977 3.20494 14.0957 3.64914 14.2625 4.27132C14.4292 4.8935 14.3066 5.4772 14.0658 6.06309C13.8986 6.46976 13.6529 6.92674 13.3567 7.44801L12.7214 7.0704L12.7132 7.0656L5.78791 3.06728L5.14026 2.68557C5.44035 2.17448 5.71074 1.73795 5.97693 1.393C6.36392 0.891518 6.80812 0.49349 7.4303 0.326777C8.05249 0.160063 8.63618 0.282668 9.22207 0.523468C9.77715 0.751604 10.426 1.12624 11.2041 1.5755Z"
                fill="#3C3B49"
              />
              <path
                d="M4.38884 3.98384L0.910867 10.0077C0.61308 10.5225 0.377621 10.9296 0.290385 11.3926C0.203149 11.8556 0.274336 12.3204 0.364367 12.9083L0.388623 13.0672C0.554809 14.1586 0.69179 15.0581 0.89839 15.7403C1.11446 16.4537 1.44662 17.0712 2.09989 17.4484C2.75316 17.8256 3.45402 17.8045 4.17991 17.6349C4.87398 17.4727 5.72151 17.1416 6.74974 16.7398L6.89949 16.6814C7.45361 16.4654 7.89176 16.2946 8.24912 15.9876C8.60648 15.6805 8.84127 15.2731 9.13821 14.7578L12.6079 8.74792L11.9591 8.36226L5.02918 4.36127L4.38884 3.98384Z"
                fill="#3C3B49"
              />
            </svg>
            Edit time
          </div>
        </SmallModal>
      )}
    </>
  );
}

function Note() {
  return (
    <div className="w-full h-32 flex items-center justify-center">
      <p className="text-grey-4 text-xs text-center font-normal font-inter">
        This is an estimate of calorie you will burn when doing the above
        exercises.
      </p>
    </div>
  );
}
