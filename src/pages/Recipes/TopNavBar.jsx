import { RecipesContext } from "../../contexts/Recipes";
import { useContext } from "react";

export function TopNavBar({ bg, textColor, text }) {
  const { setShowMealDetail } = useContext(RecipesContext);

  function handleNavigate() {
    setShowMealDetail(false);
  }

  return (
    <div
      className={`
    w-full flex justify-between items-center
     py-2 px-4 bg-${bg} text-${textColor} 
     font-montserrat font-semibold text-xl`}
    >
      <div className="cursor-pointer" onClick={handleNavigate}>
        <svg
          width="44"
          height="45"
          viewBox="0 0 44 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_1578_6439)">
            <rect
              x="10"
              y="10.5"
              width="24"
              height="24"
              rx="12"
              fill="#D4F0B5"
              shapeRendering="crispEdges"
            />
            <path
              d="M24.9167 28.3332L19.0834 22.4998L24.9167 16.6665"
              stroke="#151425"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_1578_6439"
              x="0"
              y="0.5"
              width="44"
              height="44"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius="2"
                operator="dilate"
                in="SourceAlpha"
                result="effect1_dropShadow_1578_6439"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="4" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_1578_6439"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_1578_6439"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
      <div className="w-full flex items-center justify-center">{text}</div>
    </div>
  );
}
