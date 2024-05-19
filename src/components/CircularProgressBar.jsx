/* eslint-disable react/prop-types */
export function CircularProgress ({ progress }) {
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
  
    // Function to calculate the offset for the progress circle
    const calculateOffset = (percentage) => {
      return circumference - (percentage / 100) * circumference;
    };
  
    // Function to calculate the position of the ellipsis
    const calculateEllipsisPosition = (percentage) => {
      const angle = (percentage / 100) * 2 * Math.PI - Math.PI / 2; // -90 degrees to start from the top
      const ellipsisX = 95 + radius * Math.cos(angle);
      const ellipsisY = 95 + radius * Math.sin(angle);
      return { x: ellipsisX, y: ellipsisY };
    };
  
    const offset = calculateOffset(progress);
    const ellipsisPosition = calculateEllipsisPosition(progress);
  
    return (
      <svg width="190" height="190" viewBox="0 0 190 190">
        {/* Outline circle */}
        <circle
        cx="95"
        cy="95"
        r="95"
        stroke="#e5e5e5"
        strokeWidth="1"
        fill="none"
      />
        {/* Background circle */}
        <circle cx="95" cy="95" r="90" className="stroke-white-3" strokeWidth="8" fill="none" />
        {/* Progress circle */}
        <circle
          className="stroke-secondary-6 rotate-[-90deg] origin-center transition-all duration-300 ease-out"
          cx="95"
          cy="95"
          r="90"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
        {/* Ellipsis for indicating end of progress */}
        <circle
          cx={ellipsisPosition.x}
          cy={ellipsisPosition.y}
          r="10"
          className="fill-secondary-6"
        />
      </svg>
    );
  }