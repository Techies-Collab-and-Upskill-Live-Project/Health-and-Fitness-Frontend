/* eslint-disable react/prop-types */
import { useContext } from "react";
import { useGetQuery } from "../../../hooks/useGetQuery";
import { AccountContext } from "../../../contexts/Account";
import { LogOut } from "./LogOut";

export default function Profile() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <Title />
      <User />
      <Customization />
    </div>
  );
}

function Title() {
  return <p className="font-semibold text-xl text-grey-13">Profile</p>;
}

function User() {
  const { data } = useGetQuery("profile");
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center">
      <div className="relative w-24 h-20">
        <img
          className="absolute top-0 left-0 w-[72px]"
          src={data.avatar !== null ? `${data.avatar}` : "/Union.svg"}
          alt="User Picture"
        />
        <img
          src="/editBtn.svg"
          alt="Change profile picture"
          className="absolute w-6 h-6 right-2 bottom-1 cursor-pointer"
        />
      </div>
      <p className="text-grey-6 font-semibold text-xl">{data.username}</p>
    </div>
  );
}

function Customization() {
  return (
    <div className="w-full mt-2 gap-3 flex flex-col">
      <PersonalCustomization />
      <AppCustomization />
      <DeleteAccount />
    </div>
  );
}

function PersonalCustomization() {
  const { setShowPersonalDetails } = useContext(AccountContext);
  return (
    <div className="w-full flex flex-col gap-1">
      <p className="text-grey-5 font-semibold text-base">
        Personal Customization
      </p>
      <ProfileData
        handleClick={setShowPersonalDetails}
        icon="userIcon"
        title="Personal Details"
      />
      <ProfileData icon="activity_level" title="Activity Level" />
      <ProfileData icon="notification" title="Notification Preferences" />
    </div>
  );
}
function AppCustomization() {
  const { showLogOut, setShowLogOut } = useContext(AccountContext);
  return (
    <>
      {showLogOut && <LogOut />}
      <div className="w-full flex flex-col gap-1">
        <p className="text-grey-5 font-semibold text-base">App Customization</p>
        <ProfileData icon="privacy" title="Privacy" />
        <ProfileData icon="termsAndConditions" title="Terms and Conditions" />
        <ProfileData
          handleClick={() => setShowLogOut(true)}
          icon="logout"
          title="Log out"
        />
      </div>
    </>
  );
}

function ProfileData({ handleClick, isDelete = false, icon, title }) {
  return (
    <div
      onClick={() => handleClick(true)}
      className={`cursor-pointer w-full py-[10px] 
       ${
         !isDelete && "border-b-[0.5px] border-grey-1 "
       } flex items-center justify-between text-grey-1`}
    >
      <div className="flex gap-1">
        <img src={`/${icon}.svg`} alt={title} />
        <p
          className={`font-medium text-sm ${
            isDelete ? "text-grey-11" : "text-grey-5"
          }`}
        >
          {title}
        </p>
      </div>
      <img src="/angle-right.svg" alt={`Open ${title}`} />
    </div>
  );
}

function DeleteAccount() {
  return (
    <div className="w-full py-2">
      <ProfileData isDelete={true} icon="delete" title="Delete Account" />
    </div>
  );
}
