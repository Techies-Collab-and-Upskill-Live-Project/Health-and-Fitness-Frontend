/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { LeftArrow } from "../../components/Icons";
import { useContext } from "react";
import { DiaryContext } from "../../contexts/DiaryContext";

function TopNavBar({ bg, iconFill, iconStroke, textColor, text }) {
  const navigate = useNavigate();
  const { isSearchMeal, setIsSearchMeal, setMeal } = useContext(DiaryContext);

  function handleNavigate() {
    if (isSearchMeal) {
      setIsSearchMeal(false);
      setMeal("");
    } else {
      navigate(-1);
    }
  }

  return (
    <div
      className={`
    w-full flex justify-between items-center
     p-2 bg-${bg} text-${textColor} 
     font-montserrat font-semibold text-xl`}
    >
      <div className="cursor-pointer" onClick={handleNavigate}>
        <LeftArrow fill={iconFill} stroke={iconStroke} />
      </div>
      <div className="w-full flex items-center justify-center">{text}</div>
    </div>
  );
}

export default TopNavBar;
