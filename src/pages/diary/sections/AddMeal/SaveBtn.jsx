import { useContext, useEffect, useState } from "react";
import { Button } from "../../../../components/Button";
import { DiaryContext } from "../../../../contexts/DiaryContext";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserMeal } from "../../../../services/apiMeal";
import { useNavigate } from "react-router-dom";
import { formatToBackendDate } from "../../../../utils/helpers";

export function SaveBtn() {
  const { mealObject, step, setMealObject } = useContext(DiaryContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isMealValid, setIsMealValid] = useState(false);

  const date = new Date();
  date.setDate(date.getDate() + step);

  function onClick() {
    if (!isMealValid) return;
    mutate({ date: formatToBackendDate(date), ...mealObject });
  }

  const { mutate, status } = useMutation({
    mutationFn: createUserMeal,
    networkMode: "always",
    onSuccess: async (data) => {
      /** If user's credentials are correct **/
      if (data.status == 201) {
        setMealObject({});
        queryClient.invalidateQueries({
          queryKey: ["meals"],
        });
        toast.success("Successfully created meal");
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
    onError: (err) => toast.error(err.message),
  });

  useEffect(() => {
    if (status === "pending") {
      setIsMealValid(false);
    } else {
      setIsMealValid(
        Boolean(mealObject?.name) &&
          Boolean(mealObject?.energy) &&
          Boolean(mealObject?.carbs) &&
          Boolean(mealObject?.protein) &&
          Boolean(mealObject?.fats)
      );
    }
  }, [
    status,
    mealObject?.name,
    mealObject?.energy,
    mealObject?.carbs,
    mealObject?.protein,
    mealObject?.fats,
  ]);

  return (
    <Button
      isValid={isMealValid}
      handleClick={onClick}
      width="w-full"
      bgColor={isMealValid ? "bg-primary-9" : "bg-grey-1"}
      type="button"
      mt="mt-10"
    >
      {status === "pending" ? (
        <img
          className="w-8 h-8 animate-spin"
          src="/Loader.png"
          alt="Logging in"
        />
      ) : (
        "Save meal"
      )}
    </Button>
  );
}
