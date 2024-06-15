import { useState } from "react";
import { useGetQuery } from "../../../../hooks/useGetQuery";

const DraggableProgressBar = () => {
  
  const waterIntake = useGetQuery("waterIntake");
  const [value, setValue] = useState(waterIntake.water_goal / 0.04);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <input
      type="range"
      min="0"
      max="100"
      step="0.04"
      value={value}
      onChange={handleChange}
      className="w-full h-1 bg-grey-1 rounded-lg appearance-none cursor-pointer"
      style={{
        background: `linear-gradient(to right, #FFA500 0%, #FFA500 ${value}%, #D0D0D3 ${value}%, #D0D0D3 100%)`,
      }}
    />
  );
};

export default DraggableProgressBar;