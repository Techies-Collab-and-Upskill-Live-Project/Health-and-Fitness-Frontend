/* eslint-disable react/prop-types */
import { useContext, useRef } from "react";
import { useGetQuery } from "../../../hooks/useGetQuery";
import { AccountContext } from "../../../contexts/Account";
import { LogOut } from "./LogOut";
import { ConfirmDeleteAccount } from "./DeleteAccount";
import { useCustomMutation } from "../../../hooks/useCustomMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ScreenOverlay from "../../../components/ScreenOverlay";
import Spinner from "../../../components/Spinner";
import { setAvatar } from "../../../services/apiAccount";

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
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      updateAvatar(file);
    }
  };

  const handleEditButtonClick = () => {
    fileInputRef.current.click();
  };

  const { mutate: updateAvatar, status: updateAvatarStatus } =
    useCustomMutation(
      setAvatar,
      async (data) => {
        /** If user's credentials are correct **/
        if (data.status == 200) {
          queryClient.invalidateQueries({
            queryKey: ["profile"],
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

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center">
      <div className="relative w-24 h-20">
        <img
          className="absolute rounded-full h-[72px] top-0 left-0 w-[72px]"
          src={data.avatar !== null ? `${data.avatar}` : "/Union.svg"}
          alt="User Picture"
        />
        <img
          src="/editBtn.svg"
          alt="Change profile picture"
          className="absolute w-6 h-6 right-2 bottom-1 cursor-pointer"
          onClick={handleEditButtonClick}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/*"
          capture="camera"
        />
      </div>
      <p className="text-grey-6 font-semibold text-xl">{data.username}</p>
      {updateAvatarStatus === "pending" && (
        <ScreenOverlay>
          <Spinner />
        </ScreenOverlay>
      )}
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
  const {
    setShowPersonalDetails,
    setShowActivityLevel,
    setShowNotificationalPreferences,
  } = useContext(AccountContext);
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
      <ProfileData
        handleClick={() => setShowActivityLevel(true)}
        icon="activity_level"
        title="Activity Level"
      />
      <ProfileData
        handleClick={() => setShowNotificationalPreferences(true)}
        icon="notification"
        title="Notification Preferences"
      />
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
          handleClick={setShowLogOut}
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
  const { showDeleteAccount, setShowDeleteAccount } =
    useContext(AccountContext);

  return (
    <div className="w-full py-2">
      {showDeleteAccount && <ConfirmDeleteAccount />}

      <ProfileData
        handleClick={setShowDeleteAccount}
        isDelete={true}
        icon="delete"
        title="Delete Account"
      />
    </div>
  );
}
