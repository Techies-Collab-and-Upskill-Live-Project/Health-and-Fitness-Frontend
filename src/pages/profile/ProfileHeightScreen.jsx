import { useContext } from "react";
import { ProfileContext } from "../../contexts/Profile";
import { WeightHeightInput } from "../../components/input-fields/WeightHeightInput";
import { MetricsOption } from "../../components/input-fields/MetricsOption";

/* eslint-disable react/prop-types */
export default function HeightScreen() {
  const {
    weightHeight,
    weightHeightUnit,
    setWeightHeight,
    setWeightHeightUnit,
  } = useContext(ProfileContext);

  return (
    <div className="flex w-full flex-col gap-2 items-center">
      <WeightHeightInput
        value={weightHeight.height}
        onChange={(e) =>
          setWeightHeight((prev) => ({ ...prev, height: e.target.value }))
        }
        unit={weightHeightUnit.height}
      />
      <div className="flex gap-1">
        <MetricsOption
          handleClick={() => {
            if (weightHeightUnit.height === "Cm") return;
            setWeightHeight((prev) => ({
              ...prev,
              height: (prev.height * 30.48).toFixed(2),
            }));
            setWeightHeightUnit((prev) => ({
              ...prev,
              height: "Cm",
            }));
          }}
          value="Cm"
          isSelected={weightHeightUnit.height === "Cm"}
        />
        <MetricsOption
          handleClick={() => {
            if (weightHeightUnit.height === "Ft") return;
            setWeightHeight((prev) => ({
              ...prev,
              height: (prev.height / 30.48).toFixed(2),
            }));
            setWeightHeightUnit((prev) => ({
              ...prev,
              height: "Ft",
            }));
          }}
          value="Ft"
          isSelected={weightHeightUnit.height === "Ft"}
        />
      </div>
    </div>
  );
}
