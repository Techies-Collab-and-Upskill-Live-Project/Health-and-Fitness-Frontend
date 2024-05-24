/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { InnerContainer, OuterContainer } from "../../Containers";
import { DiaryContext } from "../../../../hooks/DiaryContext";
import ScreenOverlay from "../../../../components/ScreenOverlay";

export default function MealSection() {
  const empty = false;

  return (
    <OuterContainer title="Meals">
      {empty ? (
        <InnerContainer
          isEmpty={empty}
          image_url={"/Empty_Meal.png"}
          name="Empty Meal"
        />
      ) : (
        <>
          <Meal id={1} />
          <Meal id={2} />
        </>
      )}
    </OuterContainer>
  );
}

export function Meal({ id }) {
  const { currentId, setCurrentId } = useContext(DiaryContext);

  return (
    <InnerContainer
      handleHamburgerClick={() => setCurrentId(id)}
      image_url={"/PoundedYam.png"}
      name="Oha and pounded yam"
    >
      <div className="flex flex-col gap-2">
        <p className="font-semibold">Oha and pounded yam</p>
        <p>69 kcal. 1 serving (300 ml)</p>
      </div>
      {currentId === id && (
        <ScreenOverlay>
          <DeleteMealBtn id={id} />
        </ScreenOverlay>
      )}
    </InnerContainer>
  );
}

function DeleteMealBtn() {
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  return (
    <>
      {isConfirmDelete ? (
        <Modal
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
        <div
          onClick={() => setIsConfirmDelete((initValue) => !initValue)}
          className="
      absolute w-40 h-16 rounded p-4 flex 
      items-center cursor-pointer gap-3
    bg-white-4 text-accent-6 bottom-[18%] right-[9%]"
        >
          <img src="/Trash.svg" alt="Delete Meal" />
          Delete
        </div>
      )}
    </>
  );
}

export function Modal({ title, bg, action, actionColor, children }) {
  const { setCurrentId } = useContext(DiaryContext);
  return (
    <div
      className="
  absolute max-w-[280px] min-h-[144px] rounded flex flex-col
 gap-3 text-grey-6 font-montserrat 
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
          <button
            onClick={() => setCurrentId(null)}
            className="font-inter font-normal"
          >
            Cancel
          </button>
          <button className={`text-${actionColor} font-semibold`}>
            {action}
          </button>
        </div>
      </div>
    </div>
  );
}
