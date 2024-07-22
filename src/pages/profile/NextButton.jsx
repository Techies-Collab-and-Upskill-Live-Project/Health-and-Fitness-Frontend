import { useContext } from "react";
import { Button } from "../../components/Button";
import { ProfileContext } from "../../contexts/Profile";

export function NextButton() {
  const {
    step,
    profile,
    setProfile,
    setStep,
    setDOB,
    date,
    weightHeight,
    weightHeightUnit,
  } = useContext(ProfileContext);

  const isValid =
    step === 0
      ? profile.nutritional_goal !== undefined
      : step === 1
      ? profile.sex !== undefined
      : step === 2
      ? date.day && date.month && date.year
      : step === 3
      ? weightHeight.weight
      : step === 4
      ? weightHeight.height
      : null;

  function handleNext() {
    if (step === 2) {
      setDOB();
    } else if (step === 3) {
      setProfile((profile) => ({
        ...profile,
        weight: weightHeight.weight,
        weight_unit: weightHeightUnit.weight,
      }));
    } else if (step === 4) {
      setProfile((profile) => ({
        ...profile,
        height: weightHeight.height,
        height_unit: weightHeightUnit.height,
      }));
    }
    setStep((step) => step + 1);
  }

  return (
    <Button
      isValid={isValid}
      width="w-full"
      height="h-14"
      bgColor={`transition duration-300 ${
        isValid ? "bg-primary-9" : "bg-grey-1"
      }`}
      handleClick={handleNext}
    >
      {" "}
      <p className="text-white-4">Next</p>
    </Button>
  );
}
