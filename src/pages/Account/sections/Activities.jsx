import { useContext, useEffect } from "react";
import { AccountContext } from "../../../contexts/Account";
import { useGetQuery } from "../../../hooks/useGetQuery";

const activities = [
  {
    title: "Low activity",
    description:
      "You spend most of your day sitting and or you average less than 5000 steps daily.",
  },
  {
    title: "Moderate activity",
    description:
      "You do about 30 minutes a day of intentional exercise. Examples are brisk walking or other activities around the house or you average about 8000 steps daily.",
  },
  {
    title: "Active",
    description:
      "You do about 45 minutes a day of intentional exercise. You are always on your feet at work, examples are waitress, security guard, delivery man. Or you average 10,000 steps daily.",
  },
  {
    title: "Very active",
    description:
      "You do about 60 minutes a day of intentional exercise. You engage in vigorous activities throughout the day like construction and cycling. Or you average 12,500 steps daily.",
  },
];
export function Activities() {
  const { selectedActivity, setSelectedActivity } = useContext(AccountContext);

  const { data } = useGetQuery("profile");

  useEffect(() => {
    setSelectedActivity(data.activity_level);
  }, [setSelectedActivity, data.activity_level]);

  const handleActivityChange = (activity) => {
    setSelectedActivity(activity);
  };

  return (
    <div className="space-y-5">
      {activities.map((activity, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div
            onClick={() => handleActivityChange(activity.title)}
            className="flex items-center space-x-4"
          >
            <div>
              {selectedActivity === activity.title ? (
                <svg
                  className="w-6 h-6 cursor-pointer"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3.60039C10.8969 3.60039 9.80459 3.81766 8.78546 4.2398C7.76632 4.66194 6.84031 5.28068 6.0603 6.06069C5.28029 6.84071 4.66155 7.76672 4.23941 8.78585C3.81727 9.80499 3.6 10.8973 3.6 12.0004C3.6 13.1035 3.81727 14.1958 4.23941 15.2149C4.66155 16.2341 5.28029 17.1601 6.0603 17.9401C6.84031 18.7201 7.76632 19.3388 8.78546 19.761C9.80459 20.1831 10.8969 20.4004 12 20.4004C14.2278 20.4004 16.3644 19.5154 17.9397 17.9401C19.515 16.3648 20.4 14.2282 20.4 12.0004C20.4 9.77257 19.515 7.636 17.9397 6.06069C16.3644 4.48539 14.2278 3.60039 12 3.60039ZM2.4 12.0004C2.4 9.45431 3.41143 7.01252 5.21177 5.21217C7.01212 3.41182 9.45392 2.40039 12 2.40039C14.5461 2.40039 16.9879 3.41182 18.7882 5.21217C20.5886 7.01252 21.6 9.45431 21.6 12.0004C21.6 14.5465 20.5886 16.9883 18.7882 18.7886C16.9879 20.589 14.5461 21.6004 12 21.6004C9.45392 21.6004 7.01212 20.589 5.21177 18.7886C3.41143 16.9883 2.4 14.5465 2.4 12.0004Z"
                    fill="#548D16"
                  />
                  <path
                    d="M10.8 16L6 11.7403L7.6 10.2857L10.8 13.0909L16.4 8L18 9.45455L10.8 16Z"
                    fill="#3F6A11"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 cursor-pointer"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3.60039C10.8969 3.60039 9.80459 3.81766 8.78546 4.2398C7.76632 4.66194 6.84031 5.28068 6.0603 6.06069C5.28029 6.84071 4.66155 7.76672 4.23941 8.78585C3.81727 9.80499 3.6 10.8973 3.6 12.0004C3.6 13.1035 3.81727 14.1958 4.23941 15.2149C4.66155 16.2341 5.28029 17.1601 6.0603 17.9401C6.84031 18.7201 7.76632 19.3388 8.78546 19.761C9.80459 20.1831 10.8969 20.4004 12 20.4004C14.2278 20.4004 16.3644 19.5154 17.9397 17.9401C19.515 16.3648 20.4 14.2282 20.4 12.0004C20.4 9.77257 19.515 7.636 17.9397 6.06069C16.3644 4.48539 14.2278 3.60039 12 3.60039ZM2.4 12.0004C2.4 9.45431 3.41143 7.01252 5.21177 5.21217C7.01212 3.41182 9.45392 2.40039 12 2.40039C14.5461 2.40039 16.9879 3.41182 18.7882 5.21217C20.5886 7.01252 21.6 9.45431 21.6 12.0004C21.6 14.5465 20.5886 16.9883 18.7882 18.7886C16.9879 20.589 14.5461 21.6004 12 21.6004C9.45392 21.6004 7.01212 20.589 5.21177 18.7886C3.41143 16.9883 2.4 14.5465 2.4 12.0004Z"
                    fill="#3C3B49"
                  />
                </svg>
              )}
            </div>
            <div className="text-base font-semibold">{activity.title}</div>
          </div>
          <div className="font-normal text-base">{activity.description}</div>
        </div>
      ))}
    </div>
  );
}
