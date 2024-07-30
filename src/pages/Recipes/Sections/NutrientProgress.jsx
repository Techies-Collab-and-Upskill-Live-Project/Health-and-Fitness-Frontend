/* eslint-disable react/prop-types */
export function CircularProgress({ progress, stroke, name }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  // Function to calculate the offset for the progress circle
  const calculateOffset = (percentage) => {
    return circumference - (percentage / 100) * circumference;
  };

  const offset = calculateOffset(progress);

  return (
    <div className="text-grey-6 font-medium relative w-[90px] h-[118px]">
      <svg width="90" height="90" viewBox="0 0 90 90">
        {/* Background circle */}
        <circle
          cx="45"
          cy="45"
          r="40"
          className="stroke-grey-1"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          className={`${stroke} rotate-[-90deg] origin-center transition-all duration-350 ease-out`}
          cx="45"
          cy="45"
          r="40"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <p className="absolute inset-x-6 inset-y-8 text-[23px] leading-8">
        {progress}%
      </p>
      <p className="text-base absolute bottom-[-8px] w-full text-center">
        {name}
      </p>
    </div>
  );
}
