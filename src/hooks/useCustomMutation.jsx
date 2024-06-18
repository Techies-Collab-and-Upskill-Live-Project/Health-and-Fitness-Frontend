import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteUserMeal } from "../services/apiMeal";
import { useNavigate } from "react-router-dom";

export function useCustomMutation(
  mutationFn,
  onSuccess = null,
  onError = null
) {
  const { isLoading, mutate, status } = useMutation({
    mutationFn: mutationFn,
    networkMode: "always",
    onSuccess: onSuccess,
    onError: onError,
  });
  return { isLoading, mutate, status };
}

export function useDeleteMeal(
  isSwiped = false,
  setIsConfirmDelete = null,
  onCancel = null,
) {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const { mutate, status } = useCustomMutation(
    deleteUserMeal,
    async (data) => {
      /** If user's credentials are correct **/
      if (data.status == 204) {
        if (!isSwiped) {
          setIsConfirmDelete(false);
          onCancel();
        }
        queryClient.invalidateQueries({
          queryKey: ["meals"],
        });
        toast.success("Successfully deleted meal");
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

  return { mutate, status };
}
