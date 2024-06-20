import { Pentagon } from "../../components/Pentagon";
import { DiaryProvider } from "../../contexts/DiaryContext";
import { MainWrapper } from "../diary/MainWrapper";

export default function MealPlanner() {
  return (
    <DiaryProvider>
      <MainWrapper id={3}>
        <Navigation />
        <Pentagon />
      </MainWrapper>
    </DiaryProvider>
  );
}

export function Navigation() {
  return (
    <div className="w-full pt-10 mb-[-1px] bg-primary-9 h-44 flex items-center justify-center">
      <div className="pb-[1px] w-[207px] h-full flex flex-col justify-between items-center">
        <Title />
        <WeekNavigation />
      </div>
    </div>
  );
}

function Title() {
  return <p className="font-semibold text-white-3 text-2xl">Meal Planner</p>;
}

export function WeekNavigation() {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-center text-secondary-1 font-medium text-base">
        Week 50
      </p>
      <div className="flex items-center gap-5">
        <svg
          className="cursor-pointer"
          //   onClick={onDecStep}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="12" fill="#F5F5F5" />
          <path
            d="M14.528 7.53269C14.8222 7.24111 14.8243 6.76624 14.5327 6.47204C14.2411 6.17784 13.7662 6.17573 13.472 6.46731L11.6773 8.2461C11.0013 8.91604 10.4489 9.46359 10.0571 9.95146C9.64963 10.4588 9.35469 10.9737 9.27591 11.5918C9.24136 11.8629 9.24136 12.1371 9.27591 12.4082C9.35469 13.0263 9.64963 13.5412 10.0571 14.0485C10.4489 14.5364 11.0013 15.084 11.6773 15.7539L13.472 17.5327C13.7662 17.8243 14.2411 17.8222 14.5327 17.528C14.8243 17.2338 14.8222 16.7589 14.528 16.4673L12.765 14.72C12.0495 14.0109 11.5587 13.5228 11.2266 13.1093C10.904 12.7076 10.7933 12.4496 10.7639 12.2185C10.7454 12.0734 10.7454 11.9266 10.7639 11.7815C10.7933 11.5504 10.904 11.2924 11.2266 10.8907C11.5587 10.4772 12.0495 9.98914 12.765 9.28L14.528 7.53269Z"
            fill="#2D264B"
          />
        </svg>
        <p className="font-medium text-base text-center">11-17 Dec, 2023</p>
        <svg
          className="cursor-pointer"
          //   onClick={onIncStep}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="12" fill="#F5F5F5" />
          <path
            d="M10.528 6.46731C10.2338 6.17573 9.75889 6.17784 9.46731 6.47204C9.17573 6.76624 9.17784 7.24111 9.47204 7.53269L11.235 9.28C11.9505 9.98914 12.4413 10.4772 12.7734 10.8907C13.096 11.2924 13.2067 11.5504 13.2361 11.7815C13.2546 11.9266 13.2546 12.0734 13.2361 12.2185C13.2067 12.4496 13.096 12.7076 12.7734 13.1093C12.4413 13.5228 11.9505 14.0109 11.235 14.72L9.47204 16.4673C9.17784 16.7589 9.17573 17.2338 9.46731 17.528C9.75889 17.8222 10.2338 17.8243 10.528 17.5327L12.3227 15.7539C12.9987 15.084 13.5511 14.5364 13.9429 14.0485C14.3504 13.5412 14.6453 13.0263 14.7241 12.4082C14.7586 12.1371 14.7586 11.8629 14.7241 11.5918C14.6453 10.9737 14.3504 10.4588 13.9429 9.95146C13.5511 9.46359 12.9987 8.91604 12.3227 8.24609L10.528 6.46731Z"
            fill="#2D264B"
          />
        </svg>
      </div>
    </div>
  );
}
