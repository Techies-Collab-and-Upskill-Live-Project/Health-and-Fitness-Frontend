/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { LeftArrow } from "../../components/Icons";

function TopNavBar({ bg, iconFill, iconStroke, textColor, text }) {
  const navigate = useNavigate();

  return (
    <div
      className={`
    w-full flex justify-between items-center
     p-2 bg-${bg} text-${textColor} 
     font-montserrat font-semibold text-xl`}
    >
      <div className="cursor-pointer" onClick={() => navigate(-1)}>
        <LeftArrow fill={iconFill} stroke={iconStroke} />
      </div>
      <div className="w-full flex items-center justify-center">{text}</div>
    </div>
  );
}

export default TopNavBar;
