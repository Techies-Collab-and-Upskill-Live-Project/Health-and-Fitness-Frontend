import { useContext } from "react";
import { Button } from "../../components/Button";
import { ProfileContext } from "../../contexts/Profile";
import { useCustomMutation } from "../../hooks/useCustomMutation";
import { createProfile } from "../../services/apiProfile";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function NextButton() {
  const navigate = useNavigate();

  const {
    step,
    profile,
    setProfile,
    setStep,
    setDOB,
    date,
    weightHeight,
    weightHeightUnit,
    setIsBuilding,
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
      : step === 5
      ? profile.activity_level !== undefined
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
    } else if (step === 5) {
      setIsBuilding(status);
      mutate({
        ...profile,
      });
    }
    if (step !== 5) setStep((step) => step + 1);
  }

  const { mutate, status } = useCustomMutation(
    createProfile,
    async (data) => {
      /** If user's credentials are correct **/
      if (data.status == 201) {
        navigate("/diary");
      } else if (data.status == 401) {
        /** If user's credentials are not correct **/
        navigate("/log-in");
      } else if (data.status == 400) {
        /** If user does not provide one or more fields **/
        Object.entries(data.data).forEach(([fieldName, errorMessages]) => {
          try {
            errorMessages.forEach((errorMessage) => {
              toast.error(`${fieldName}: ${errorMessage}`); //Make toast
            });
          } catch {
            toast.error(`${errorMessages}`);
          }
        });
      }
    },
    (err) => toast.error(err.message)
  );

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
      <p className="text-white-4">{step === 5 ? "Done" : "Next"}</p>
    </Button>
  );
}
