/* eslint-disable react/prop-types */
export function Pentagon({ type = null }) {
  return (
    <svg viewBox="0 20 50 50" className="w-full h-[100px]">
      <polygon
        points={`25,35 
          ${type === "planner" ? "-300" : "-135"},20 
          ${type === "planner" ? "350" : "185"},20`}
        className="fill-primary-9"
      ></polygon>
    </svg>
  );
}
