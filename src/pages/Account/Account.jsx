/* eslint-disable react/prop-types */
import { MainWrapper } from "../diary/MainWrapper";
import Spinner from "../../components/Spinner";

import { useQuery } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../services/apiAuths";
import { DiaryProvider } from "../../contexts/DiaryContext";

export default function Account() {
  return (
    <DiaryProvider>
      <AccountPage />
    </DiaryProvider>
  );
}

export function AccountPage() {
  const navigate = useNavigate();

  const { isLoading: isFetchingProfile, data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getUserProfile(),
  });

  console.log(profileData);
  // If user is logged out, redirect to log in page
  if (profileData?.status === 401) {
    navigate("/log-in");
  }

  if (isFetchingProfile) return <Spinner />;

  return <MainWrapper id={4}>Profile</MainWrapper>;
}
