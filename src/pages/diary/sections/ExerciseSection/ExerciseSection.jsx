/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { InnerContainer, OuterContainer } from "../../Containers";
import ScreenOverlay from "../../../../components/ScreenOverlay";
import { Modal } from "../MealSection/MealSection";
import SmallModal from "../../../../components/SmallModal";
import { useState } from "react";

export default function ExerciseSection() {
  const navigate = useNavigate();
  const empty = false;

  return (
    <OuterContainer
      handleClick={() => {
        navigate("/diary/add-exercise");
      }}
      title="Exercises"
    >
      {empty ? (
        <InnerContainer
          isEmpty={empty}
          image_url={"/exercise.png"}
          name="Exercise"
        />
      ) : (
        <>
          <Exercise />
          <Exercise />
        </>
      )}
    </OuterContainer>
  );
}

export function Exercise() {
  const [showExerciseModal, setShowExerciseModal] = useState(false);

  return (
    <InnerContainer
      handleHamburgerClick={() => setShowExerciseModal(true)}
      image_url={"/exercise.png"}
      name="Exercise"
    >
      <div className="flex flex-col h-[60px] justify-end">
        <p className="flex items-center justify-center gap-2">
          <span>Walking</span>
          <img src="/Flame.svg" alt="Burned calorie" /> <span>100 kcal</span>
        </p>
      </div>
      {showExerciseModal && (
        <ScreenOverlay>
          <DeleteExerciseBtn handleCancel={setShowExerciseModal} />
        </ScreenOverlay>
      )}
    </InnerContainer>
  );
}

function DeleteExerciseBtn({ handleCancel }) {
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);

  function onCancel() {
    handleCancel(false);
  }

  return (
    <>
      {isConfirmDelete ? (
        <Modal
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
