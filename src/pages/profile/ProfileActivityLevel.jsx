import { useContext } from "react";
import { ProfileContext } from "../../contexts/Profile";

/* eslint-disable react/prop-types */
export default function ActivityScreen() {
  const { profile, setProfile } = useContext(ProfileContext);

  return (
    <div className="flex w-full flex-col gap-4">
      {Activities.map((activity, index) => {
        return (
          <ActivityOption
            key={index}
            isSelected={profile.activity_level === activity.title}
            title={activity.title}
            detail={activity.detail}
            handleClick={() =>
              setProfile((profile) => ({
                ...profile,
                activity_level: activity.title,
              }))
            }
          />
        );
      })}
    </div>
  );
}

function ActivityOption({ isSelected, title, detail, handleClick }) {
  return (
    <div className="flex flex-col w-full gap-2 text-grey-5">
      <div
        className="flex w-full gap-2 items-center cursor-pointer"
        onClick={handleClick}
      >
        {isSelected ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0004 3.60002C10.8973 3.60002 9.80499 3.8173 8.78585 4.23944C7.76672 4.66158 6.84071 5.28032 6.06069 6.06033C5.28068 6.84034 4.66194 7.76635 4.2398 8.78548C3.81766 9.80462 3.60039 10.8969 3.60039 12C3.60039 13.1031 3.81766 14.1954 4.2398 15.2146C4.66194 16.2337 5.28068 17.1597 6.06069 17.9397C6.84071 18.7197 7.76672 19.3385 8.78585 19.7606C9.80499 20.1828 10.8973 20.4 12.0004 20.4C14.2282 20.4 16.3648 19.515 17.9401 17.9397C19.5154 16.3644 20.4004 14.2278 20.4004 12C20.4004 9.77221 19.5154 7.63563 17.9401 6.06033C16.3648 4.48502 14.2282 3.60002 12.0004 3.60002ZM2.40039 12C2.40039 9.45395 3.41182 7.01215 5.21217 5.2118C7.01252 3.41145 9.45431 2.40002 12.0004 2.40002C14.5465 2.40002 16.9883 3.41145 18.7886 5.2118C20.589 7.01215 21.6004 9.45395 21.6004 12C21.6004 14.5461 20.589 16.9879 18.7886 18.7882C16.9883 20.5886 14.5465 21.6 12.0004 21.6C9.45431 21.6 7.01252 20.5886 5.21217 18.7882C3.41182 16.9879 2.40039 14.5461 2.40039 12Z"
              fill="#548D16"
            />
            <path
              d="M10.8 16L6 11.7403L7.6 10.2857L10.8 13.0909L16.4 8L18 9.45455L10.8 16Z"
              fill="#3F6A11"
            />
          </svg>
        ) : (
          <div className="w-6 h-6 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full border border-grey-5"></div>
          </div>
        )}
        <p className="font-semibold text-base">{title}</p>
      </div>
      <p className="font-normal text-xs">{detail}</p>
    </div>
  );
}

const Activities = [
  {
    title: "Low activity",
    detail:
      "You spend most of your day sitting and or you\
       average less than 5000 steps daily.",
  },
  {
    title: "Moderate activity",
    detail:
      "You do about 30 minutes a day of intentional \
      exercise. Examples are brisk walking or other activities around \
      the house or you average about 8000 steps daily.",
  },
  {
    title: "Active",
    detail:
      "You do about 45 minutes a day of intentional exercise. You are always\
       on your feet at work, examples are waitress, security guard, delivery man. Or you average 10,000 steps daily.",
  },
  {
    title: "Very Active",
    detail:
      "You do about 60 minutes a day of intentional exercise. You engage in \
      vigorous activities throughout the day like construction and cycling. Or you average 12,500 steps daily.",
  },
];
