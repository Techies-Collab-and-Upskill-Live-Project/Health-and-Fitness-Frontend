import { useContext } from "react";
import { Button } from "../../components/Button";
import { ProfileContext } from "../../contexts/Profile";

export function NextButton() {
  const { step, profile, setStep } = useContext(ProfileContext);

  const isValid =
    step === 0
      ? profile.weight !== undefined
      : step === 1
      ? profile.gender !== undefined
      : profile.dob !== undefined;

  return (
    <Button
      isValid={isValid}
      width="w-full"
      height="h-14"
      bgColor={`transition duration-300 ${
        isValid ? "bg-primary-9" : "bg-grey-1"
      }`}
      handleClick={() => setStep((step) => step + 1)}
    >
      {" "}
      <p className="text-white-4">Next</p>
    </Button>
  );
}
