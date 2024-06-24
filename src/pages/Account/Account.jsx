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
  const { showPersonalDetails, showActivityLevel } = useContext(AccountContext);

  const { isLoading: isFetchingProfile, data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getUserProfile(),
  });

  // If user is logged out, redirect to log in page
  if (profileData?.status === 401) {
    navigate("/log-in");
  }

  if (isFetchingProfile) return <Spinner />;

  return (
    <MainWrapper id={4}>
      {showPersonalDetails ? (
        <PersonalDetails />
      ) : showActivityLevel ? (
        <ActivityLevel />
      ) : (
        <Profile />
      )}
    </MainWrapper>
  );
}
