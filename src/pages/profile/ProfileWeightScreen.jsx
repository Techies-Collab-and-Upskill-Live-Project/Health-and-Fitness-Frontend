import { useContext } from "react";
import { ProfileContext } from "../../contexts/Profile";
import { MetricsOption } from "../../components/input-fields/MetricsOption";
import { WeightHeightInput } from "../../components/input-fields/WeightHeightInput";

/* eslint-disable react/prop-types */
export default function WeightScreen() {
  const {
    weightHeight,
    weightHeightUnit,
    setWeightHeight,
    setWeightHeightUnit,
  } = useContext(ProfileContext);

  return (
    <div className="flex w-full flex-col gap-2 items-center">
      <WeightHeightInput
        value={weightHeight.weight}
        onChange={(e) =>
          setWeightHeight((prev) => ({ ...prev, weight: e.target.value }))
        }
        unit={weightHeightUnit.weight}
      />
      <div className="flex gap-1">
        <MetricsOption
          handleClick={() => {
            if (weightHeightUnit.weight === "Kg") return;
            setWeightHeight((prev) => ({
              ...prev,
              weight: (prev.weight * 0.453592).toFixed(2),
            }));
            setWeightHeightUnit((prev) => ({
              ...prev,
              weight: "Kg",
            }));
          }}
          value="Kg"
          isSelected={weightHeightUnit.weight === "Kg"}
        />
        <MetricsOption
          handleClick={() => {
            if (weightHeightUnit.weight === "lbs") return;
            setWeightHeight((prev) => ({
              ...prev,
              weight: (prev.weight / 0.453592).toFixed(2),
            }));
            setWeightHeightUnit((prev) => ({
              ...prev,
              weight: "lbs",
            }));
          }}
          value="lbs"
          isSelected={weightHeightUnit.weight === "lbs"}
        />
      </div>
    </div>
  );
}
