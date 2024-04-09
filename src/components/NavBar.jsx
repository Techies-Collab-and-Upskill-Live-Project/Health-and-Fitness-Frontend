import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export function NavBar({ children }) {
  const navigate = useNavigate();

  function handleNavigateToHome() {
    navigate("/on-boarding");
  }
  return (
    <div
      className="
    grid grid-cols-[auto_auto] h-7 items-center w-full text-grey-6"
    >
      <svg
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleNavigateToHome}
      >
        <path
          d="M16 7.5H3.83L9.42 1.91L8 0.5L0 8.5L8 16.5L9.41 15.09L3.83 9.5H16V7.5Z"
          fill="#151425"
        />
      </svg>
      <h4 className="text-xl font-semibold text-grey-6">{children}</h4>
    </div>
  );
}
