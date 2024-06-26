/* eslint-disable react/prop-types */
import { MainWrapper } from "../diary/MainWrapper";
import Spinner from "../../components/Spinner";

import { useQuery } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../services/apiAuths";
import { DiaryProvider } from "../../contexts/DiaryContext";
import Profile from "./sections/Profile";
import { useContext } from "react";
import { AccountContext, AccountProvider } from "../../contexts/Account";
import PersonalDetails from "./sections/PersonalDetails/PersonalDetails";
import ActivityLevel from "./sections/ActivityLevel";
import NotificationalPreferences from "./sections/NotificationalPreferences";
import { getNotificationPreferences } from "../../services/apiAccount";
import Goal from "./sections/PersonalDetails/Goal";

export default function Account() {
  return (
    <DiaryProvider>
      <AccountProvider>
        <AccountPage />
      </AccountProvider>
    </DiaryProvider>
  );
}

export function AccountPage() {
  const navigate = useNavigate();
  const {
    showPersonalDetails,
    showActivityLevel,
    showNotificationalPreferences,
    showGoal,
  } = useContext(AccountContext);

  const { isLoading: isFetchingProfile, data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
  });

  const { isLoading: isFetchingPreferences, data: preferenceData } = useQuery({
    queryKey: ["preferences"],
    queryFn: getNotificationPreferences,
  });

  // If user is logged out, redirect to log in page
  if (profileData?.status === 401 || preferenceData?.status === 401) {
    navigate("/log-in");
  }

  if (isFetchingProfile || isFetchingPreferences) return <Spinner />;

  return (
    <MainWrapper id={4}>
      {showPersonalDetails ? (
        <PersonalDetails />
      ) : showActivityLevel ? (
        <ActivityLevel />
      ) : showNotificationalPreferences ? (
        <NotificationalPreferences />
      ) : showGoal ? (
        <Goal />
      ) : (
        <Profile />
      )}
    </MainWrapper>
  );
}
