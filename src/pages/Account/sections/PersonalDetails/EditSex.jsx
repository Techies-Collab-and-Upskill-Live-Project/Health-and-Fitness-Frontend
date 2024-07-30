/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { useGetQuery } from "../../../../hooks/useGetQuery";
import { AccountContext } from "../../../../contexts/Account";
import { useCustomMutation } from "../../../../hooks/useCustomMutation";
import ScreenOverlay from "../../../../components/ScreenOverlay";
import { updateProfile } from "../../../../services/apiAccount";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../components/Spinner";
import { Modal, GenderSwitcher } from "./Modal";

export function EditSex() {
  const { setShowEditSex, selectedSex, setSelectedSex } =
    useContext(AccountContext);
  const { data } = useGetQuery("profile");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedSex(data.sex);
  }, [setSelectedSex, data.sex]);

  function handleUpdateSex() {
    if (selectedSex === data.sex) {
      onCancel();
      return;
    }
    updateSex({ sex: selectedSex });
  }

  function onCancel() {
    setShowEditSex(false);
  }

  const { mutate: updateSex, status: updateSexStatus } = useCustomMutation(
    updateProfile,
    async (data) => {
      /** If user's credentials are correct **/
      if (data.status == 200) {
        queryClient.invalidateQueries({
          queryKey: ["profile"],
        });
        onCancel();
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
    <ScreenOverlay>
      <>
        {updateSexStatus === "pending" ? (
          <Spinner />
        ) : (
          <Modal
            handleAction={handleUpdateSex}
            handleCancel={onCancel}
            title="Sex"
            bg="bg-white-3"
            action="Save"
            actionColor="primary-8"
          >
            <GenderSwitcher />
          </Modal>
        )}
      </>
    </ScreenOverlay>
  );
}
