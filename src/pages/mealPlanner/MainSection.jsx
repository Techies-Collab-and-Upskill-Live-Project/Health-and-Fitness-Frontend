import { useContext, useState } from "react";
import ScreenOverlay from "../../components/ScreenOverlay";
import { MealPlannerContext } from "../../contexts/MealPlanner";
import { Modal } from "../diary/sections/MealSection/MealSection";
import SmallModal from "../../components/SmallModal";
import { useGetQuery } from "../../hooks/useGetQuery";
import { useCustomMutation } from "../../hooks/useCustomMutation";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  createPlannedMeal,
  deleteUserMeal,
  updatePlannedMeal,
} from "../../services/apiMealPlanner";
import { useNavigate } from "react-router-dom";
import { InlineSpinner } from "../../components/InlineSpinner";
import Spinner from "../../components/Spinner";

/* eslint-disable react/prop-types */
export default function MainSection() {
  return (
    <div className="w-full pt-4 mt-[-65px] px-2 flex flex-col gap-4">
      <DayContainer day="Monday" />
      <DayContainer day="Tuesday" />
      <DayContainer day="Wednesday" />
      <DayContainer day="Thursday" />
      <DayContainer day="Friday" />
      <DayContainer day="Saturday" />
      <DayContainer day="Sunday" />
    </div>
  );
}
function DayContainer({ day }) {
  const { data: plannedMeals, status } = useGetQuery("plannedMeals");

  const breakfastMeal =
    status !== 404
      ? plannedMeals.find(
          (meal) => meal.day === day && meal.meal_type === "Breakfast"
        )
      : undefined;
  const lunchMeal =
    status !== 404
      ? plannedMeals.find(
          (meal) => meal.day === day && meal.meal_type === "Lunch"
        )
      : undefined;
  const dinnerMeal =
    status !== 404
      ? plannedMeals.find(
          (meal) => meal.day === day && meal.meal_type === "Dinner"
        )
      : undefined;
  const snack =
    status !== 404
      ? plannedMeals.find(
          (meal) => meal.day === day && meal.meal_type === "Snack"
        )
      : undefined;

  return (
    <div className="w-full flex flex-col gap-3 rounded border border-grey-1 p-2">
      <Title title={day} />
      <Meals>
        <Meal day={day} meal={breakfastMeal} type="Breakfast" />
        <Meal day={day} meal={lunchMeal} type="Lunch" />
        <Meal day={day} meal={dinnerMeal} type="Dinner" />
        <Meal day={day} meal={snack} type="Snack" />
      </Meals>
    </div>
  );
}
function Title({ title }) {
  return (
    <p
      className="w-max bg-secondary-2 px-3 py-[6px]
     rounded-[5px] text-secondary-10 font-semibold
     text-base"
    >
      {title}
    </p>
  );
}
function Meals({ children }) {
  return <div className="w-full flex flex-col gap-3">{children}</div>;
}
function Meal({ day, meal, type }) {
  const status = meal === undefined ? 404 : 200;

  const resCode = status === 404 ? 201 : 200;

  const {
    plannedMealCurrentId,
    setPlannedMealCurrentId,
    weekNumber,
    year,
    backendDateRange,
  } = useContext(MealPlannerContext);

  const [value, setValue] = useState(meal === undefined ? "" : meal.meal_name);

  const id = meal?.id;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  function handleSetPlannedMealCurrentId() {
    setPlannedMealCurrentId(id);
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleUpdateMeal() {
    if (meal?.meal_name === value || value === "") {
      return;
    }

    const data =
      status === 404
        ? {
            week_number: weekNumber,
            date_range: backendDateRange,
            year: year,
            meal_name: value,
            day: day,
            meal_type: type,
          }
        : { meal_name: value };

    updateMeal({ data, id });
  }

  const { mutate: updateMeal, status: updateMealStatus } = useCustomMutation(
    status === 404 ? createPlannedMeal : updatePlannedMeal,
    async (data) => {
      /** If user's credentials are correct **/
      if (data.status == resCode) {
        queryClient.invalidateQueries({
          queryKey: ["plannedMeals"],
        });
        toast.success("Successfully updated meal");
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
    <>
      <label className="relative grid auto-rows-max gap-2">
        <p
          className=" w-[104px] h-8 flex items-center justify-center
         text-base font-normal text-grey-13
      absolute rounded-sm border-[1px]
       border-grey-12 left-2 top-[25%]"
        >
          {type}
        </p>
        <input
          className={`h-[52px] opacity-0.5 py-8 pl-[120px] pr-6 
          w-full bg-transparent outline-1 outline-white border
           rounded focus:outline-none transition focus:border-primary-7
          placeholder:text-xs placeholder:text-grey-13 text-grey-6 text-sm
           placeholder:font-normal font-medium
        placeholder:font-montserrat border-grey-12`}
          placeholder="Add meal"
          value={value}
          onChange={handleChange}
          onBlur={handleUpdateMeal}
        />
        {id !== undefined && (
          <img
            onClick={handleSetPlannedMealCurrentId}
            className="absolute right-[12px] top-[35%] cursor-pointer"
            src="/Hamburger.svg"
            alt="Delete meal"
          />
        )}
      </label>
      {updateMealStatus === "pending" ? (
        <ScreenOverlay>
          <div className="flex items-center justify-center w-full h-full">
            <InlineSpinner type="Updating planned meal" />
          </div>
        </ScreenOverlay>
      ) : (
        plannedMealCurrentId === id && (
          <ScreenOverlay>
            <DeleteMealBtn clearName={setValue} id={id} />
          </ScreenOverlay>
        )
      )}
    </>
  );
}

function DeleteMealBtn({ clearName, id }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const { setPlannedMealCurrentId } = useContext(MealPlannerContext);

  function onCancel() {
    setPlannedMealCurrentId(null);
  }

  function onDelete() {
    deleteMeal(id);
  }

  const { mutate: deleteMeal, status: deleteMealStatus } = useCustomMutation(
    deleteUserMeal,
    async (data) => {
      /** If user's credentials are correct **/
      if (data.status == 204) {
        queryClient.invalidateQueries({
          queryKey: ["plannedMeals"],
        });
        clearName("");
        toast.success("Successfully deleted meal");
        onCancel();
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
    <>
      {deleteMealStatus === "pending" ? (
        <Spinner />
      ) : isConfirmDelete ? (
        <Modal
          handleAction={onDelete}
          handleCancel={onCancel}
          title={"Delete Meal?"}
          bg={"bg-accent-1"}
          action={"Delete"}
          actionColor={"accent-6"}
        >
          <p className="text-grey-4 font-medium text-[11px] leading-[18px]">
            Meal will be permanently removed from your meal planner.
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
