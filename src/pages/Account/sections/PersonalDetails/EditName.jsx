import { useContext, useState } from "react";
import { useGetQuery } from "../../../../hooks/useGetQuery";
import { AccountContext } from "../../../../contexts/Account";
import { useCustomMutation } from "../../../../hooks/useCustomMutation";
import { Modal } from "../../Modal";
import ScreenOverlay from "../../../../components/ScreenOverlay";
import { setNewUsername } from "../../../../services/apiAccount";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../components/Spinner";

export function EditName() {
  const { setShowEditName } = useContext(AccountContext);
  const { data } = useGetQuery("profile");
  const [value, setValue] = useState(data.username);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  function handleUpdateName() {
    if (value === data.username) {
      onCancel();
      return;
    }
    updateName({ new_username: value });
  }

  function onCancel() {
    setShowEditName(false);
  }

  const { mutate: updateName, status: updateNameStatus } = useCustomMutation(
    setNewUsername,
    async (data) => {
      /** If user's credentials are correct **/
      if (data.status == 200) {
        queryClient.invalidateQueries({
          queryKey: ["profile"],
        });
        toast.success("Successfully updated username");
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
        {updateNameStatus === "pending" ? (
          <Spinner />
        ) : (
          <Modal
            handleAction={handleUpdateName}
            handleCancel={onCancel}
            title="Name"
            bg="bg-primary-1"
            action="Save"
            actionColor="primary-8"
          >
            <input
              type="text"
              className="focus:outline-none w-full
              border-b border-grey-6 outline-none"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              autoFocus={true}
            />
          </Modal>
        )}
      </>
    </ScreenOverlay>
  );
}
