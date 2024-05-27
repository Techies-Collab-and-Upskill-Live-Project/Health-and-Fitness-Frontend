/* eslint-disable react/prop-types */
export function LeftArrow({ fill, stroke }) {
  return (
   <div>
     <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className={`fill-${fill} rounded-full bg-${fill}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.9167 15.8334L7.08334 10.0001L12.9167 4.16675"
        className={`stroke-${stroke}`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
   </div>
  );
}
