/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { LeftArrow } from "../../components/Icons";
import { useContext } from "react";
import { DiaryContext } from "../../contexts/DiaryContext";

function TopNavBar({ bg, iconFill, iconStroke, textColor, text }) {
  const navigate = useNavigate();
  const {
    isSearchMeal,
    setIsSearchMeal,
    setMeal,
    showWaterSettings,
    setShowWaterSettings,
    showAddMeal,
    setShowAddMeal,
    showAddExercise,
    setShowAddExercise,
  } = useContext(DiaryContext);

  function handleNavigate() {
    // Handle back navigation on meal search page
    if (isSearchMeal) {
      setIsSearchMeal(false);
      setMeal("");
      // Handle back navigation on water settings page
    } else if (showWaterSettings) {
      setShowWaterSettings(false);
      // Handle back navigation on add exercise page
    } else if (showAddExercise) {
      setShowAddExercise(false);
      // Handle back navigation on add meal page
    } else if (showAddMeal) {
      setShowAddMeal(false);
      // Handle back navigation on other pages
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
