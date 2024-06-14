/* eslint-disable react/prop-types */

import { DiaryProvider } from "../../contexts/DiaryContext";

import CalorieLog from "./CalorieLog";
import SectionTwo from "./SectionTwo";
import { Pentagon } from "../../components/Pentagon";
import { Pill } from "../../components/Pill";
import { MainWrapper } from "./MainWrapper";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Diary() {
  const navigate = useNavigate();

  const access = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");
  useEffect(() => {
    if (access === null || refresh === null) {
      navigate("/log-in");
    }
  }, [navigate, access, refresh]);

  if (access === null || refresh === null) {
    return null;
  }

  return (
    <DiaryProvider>
      <MainWrapper id={1}>
        <CalorieLog />
        <Pentagon />
        <Pill />
        <SectionTwo />
      </MainWrapper>
    </DiaryProvider>
  );
}
