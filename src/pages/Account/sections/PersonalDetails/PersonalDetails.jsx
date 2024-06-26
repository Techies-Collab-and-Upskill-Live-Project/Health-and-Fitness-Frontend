/* eslint-disable react/prop-types */
import { useContext } from "react";
import { useGetQuery } from "../../../../hooks/useGetQuery";
import { capitalizeFirstLetter, roundUp } from "../../../../utils/helpers";
import { AccountContext } from "../../../../contexts/Account";

import TopNavBar from "../../TopNavBar";

import { EditName } from "./EditName";
import { EditSex } from "./EditSex";
export default function PersonalDetails() {
  return (
    <div className="p-4 flex flex-col gap-4 text-grey-5">
      <TopNavBar text="Personal Details" textColor="grey-5" />
      <Details />
    </div>
  );
}

function Details() {
  const {
    showEditName,
    showEditSex,
    setShowEditName,
    setShowEditSex,
    setShowActivityLevel,
    setShowPersonalDetails,
    setShowGoal,
  } = useContext(AccountContext);
  const { data } = useGetQuery("profile");
  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <Detail
          handleClick={() => setShowEditName(true)}
          title="Name"
          value={data.username}
        />
        <Detail
          title="Current Weight"
          value={`${roundUp(data.weight)}${data.weight_unit}`}
        />
        <Detail
          title="Height"
          value={`${roundUp(data.height)}${data.height_unit}`}
        />
        <Detail
          handleClick={() => setShowEditSex(true)}
          title="Sex"
          value={data.sex}
        />
        <Detail
          handleClick={() => {
            setShowPersonalDetails(false);
            setShowActivityLevel(true);
          }}
          title="Activity Level"
          value={data.activity_level}
        />
        <Detail
          handleClick={() => {
            setShowPersonalDetails(false);
            setShowGoal(true);
          }}
          title="My Goal"
          value={capitalizeFirstLetter(data.nutritional_goal)}
        />
      </div>

      {showEditName && <EditName />}
      {showEditSex && <EditSex />}
    </>
  );
}

function Detail({ title, value, handleClick }) {
  return (
    <div
      onClick={handleClick}
      className="w-full flex justify-between
    rounded border-b-[0.5px] border-grey-1 
    bg-white-4 py-2 px-1 cursor-pointer"
    >
      <p className="font-semibold text-base">{title}</p>
      <div className="flex gap-2 items-center">
        <p className="font-medium text-sm">{value}</p>
        <img src="/angle-right.svg" alt={`Open ${title}`} />
      </div>
    </div>
  );
}
