import { useContext } from "react";
import { Button } from "../../components/Button";
import { ProfileContext } from "../../contexts/Profile";

export function NextButton() {
  const { step, profile, setStep, setDOB, date } = useContext(ProfileContext);

  const isValid =
    step === 0
      ? profile.weight !== undefined
      : step === 1
      ? profile.gender !== undefined
      : step === 2
      ? date.day && date.month && date.year
      : null;

  function handleNext() {
    if (step === 2) {
      setDOB();
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
