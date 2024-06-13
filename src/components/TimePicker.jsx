import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { animated } from "react-spring";

const TimePicker = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(15);

  const updateHours = (newHour) => setHours(() => (newHour + 24) % 24);
  const updateMinutes = (newMinute) => setMinutes(() => (newMinute + 60) % 60);

  const hourHandlers = useSwipeable({
    onSwipedUp: () => updateHours(hours + 1),
    onSwipedDown: () => updateHours(hours - 1),
  });

  const minuteHandlers = useSwipeable({
    onSwipedUp: () => updateMinutes(minutes + 1),
    onSwipedDown: () => updateMinutes(minutes - 1),
  });

  const createItems = (current, max) => [
    (current - 1 + max) % max,
    current,
    (current + 1) % max,
  ];

  const hourItems = createItems(hours, 24);
  const minuteItems = createItems(minutes, 60);

  return (
    <div className="flex items-center justify-center font-montserrat w-full gap-[29px]">
      <div
        {...hourHandlers}
        className="w-[58px] flex flex-col justify-between items-center h-32 overflow-hidden"
      >
        {hourItems.map((hour, index) => (
          <animated.div
            key={hour}
            className={`text-base cursor-pointer h-10 flex items-center ${
              index === 1
                ? "text-grey-6 font-semibold w-[58px] justify-center"
                : "text-grey-4 font-normal h-8 w-[34px]"
            }`}
          >
            <div className="flex items-center">
              <p
                className={`${
                  index === 1 &&
                  "border-y-[1px] mr-[6px] flex items-center justify-center w-[34px] h-10 border-grey-6"
                }`}
              >
                {String(hour).padStart(2, "0")}
              </p>
              {index === 1 && <span className="text-base">hr</span>}
            </div>
          </animated.div>
        ))}
      </div>
      <div
        {...minuteHandlers}
        className="w-[73px] flex flex-col justify-between items-center h-32 overflow-hidden"
      >
        {minuteItems.map((minute, index) => (
          <animated.div
            key={minute}
            className={`text-base cursor-pointer h-10 flex ${
              index === 1
                ? "text-grey-6 font-semibold w-[73px] items-center justify-center"
                : "text-grey-4 font-normal h-8 w-[34px] self-stretch justify-center"
            }`}
          >
            <div className="flex items-center">
              <p
                className={`${
                  index === 1 &&
                  "border-y-[1px] mr-[6px] flex items-center justify-center w-[34px] h-10 border-grey-6"
                }`}
              >
                {String(minute).padStart(2, "0")}
              </p>
              {index === 1 && <span className="text-base">min</span>}
            </div>
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default TimePicker;
