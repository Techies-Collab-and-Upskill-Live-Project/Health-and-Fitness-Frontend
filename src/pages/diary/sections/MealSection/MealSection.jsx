/* eslint-disable react/prop-types */
import { useContext, useState } from "react";

import { useGetQuery } from "../../../../hooks/useGetQuery";
import { DiaryContext } from "../../../../contexts/DiaryContext";
import { roundUp } from "../../../../utils/helpers";

import { InnerContainer, OuterContainer } from "../../Containers";

import ScreenOverlay from "../../../../components/ScreenOverlay";
import SmallModal from "../../../../components/SmallModal";
import SwipeableDiv from "../../../../components/SwipeableDiv";
import { InlineSpinner } from "../../../../components/InlineSpinner";
import { useDeleteMeal } from "../../../../hooks/useCustomMutation";

export default function MealSection() {
  const { data: mealData, status: mealStatus } = useGetQuery("meals");
  const { setShowAddMeal } = useContext(DiaryContext);

  function onAddMeal() {
    setShowAddMeal(true);
  }

  return (
    <OuterContainer title="Meals" handleClick={onAddMeal}>
      {mealStatus === 404 ? (
        <InnerContainer
          isEmpty={mealStatus === 404}
          image_url={"/Empty_Meal.png"}
          name="Empty Meal"
        />
      ) : (
        <>
          {mealData.map((meal) => {
            return (
              <SwipeableDiv id={meal.id} key={meal.id}>
                <Meal meal={meal} id={meal.id} />
              </SwipeableDiv>
            );
          })}
        </>
      )}
    </OuterContainer>
  );
}

export function Meal({ id, meal }) {
  const { currentId, setCurrentId } = useContext(DiaryContext);

  return (
    <InnerContainer
      handleHamburgerClick={() => setCurrentId(id)}
      image_url={meal?.image_url ? meal?.image_url : "/mealPlaceholder.png"}
      name={meal.name}
    >
      <div className="flex flex-col gap-2">
        <p className="font-semibold">{meal.name}</p>
        <p>
          {roundUp(meal.energy)} kcal. {meal.servings} serving (
          {300 * meal.servings} ml)
        </p>
      </div>
      {currentId === id && (
        <ScreenOverlay>
          <DeleteMealBtn id={id} />
        </ScreenOverlay>
      )}
    </InnerContainer>
  );
}

function DeleteMealBtn({ id }) {
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const { setCurrentId } = useContext(DiaryContext);

  function onCancel() {
    setCurrentId(null);
  }
  function onDelete() {
    mutate(id);
  }

  const { mutate, status } = useDeleteMeal(false, setIsConfirmDelete, onCancel);

  return (
    <>
      {status === "pending" ? (
        <div className="flex items-center justify-center w-full h-full">
          <InlineSpinner type="Deleting meal" />
        </div>
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
            Meal will be permanently removed from your meal diary.
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

export function Modal({
  title,
  bg,
  action,
  actionColor,
  handleCancel,
  handleAction,
  children,
}) {
  return (
    <div
      className="
  absolute max-w-[280px] min-h-[144px] rounded flex flex-col
 gap-3 text-grey-6 font-montserrat min-w-11 
  text-base bg-white-4 right-[25%] left-[25%] 
  overlayScreen:right-[15%] overlayScreen:left-[15%] top-[40%]"
    >
      <div
        className={`
        w-full ${bg} p-2 pl-4 font-semibold rounded-t
        `}
      >
        {title}
      </div>
      <div className="gap-4 pt-0 p-4 flex flex-col w-full h-full">
        {children}
        <div className="w-full flex justify-end gap-[14px]">
          <button onClick={handleCancel} className="font-inter font-normal">
            Cancel
          </button>
          <button
            onClick={handleAction}
            className={`text-${actionColor} font-semibold`}
          >
            {action}
          </button>
        </div>
      </div>
    </div>
  );
}
