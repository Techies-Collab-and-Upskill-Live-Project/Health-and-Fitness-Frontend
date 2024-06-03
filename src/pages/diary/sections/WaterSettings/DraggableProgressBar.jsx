import { useState } from "react";

const DraggableProgressBar = () => {
  const [value, setValue] = useState(50);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <input
      type="range"
      min="0"
      max="100"
      step="6.25"
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

// 1 CUP = 6.25% OF THE RANGE