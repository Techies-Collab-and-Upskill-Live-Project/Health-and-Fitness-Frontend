import { useContext } from "react";
import { AccountContext } from "../../../contexts/Account";
import { useNavigate } from "react-router-dom";
import { useCustomMutation } from "../../../hooks/useCustomMutation";
import toast from "react-hot-toast";
import ScreenOverlay from "../../../components/ScreenOverlay";
import Spinner from "../../../components/Spinner";
import { Modal } from "../Modal";
import { useGetQuery } from "../../../hooks/useGetQuery";
import { deleteAccount } from "../../../services/apiAuths";

export function ConfirmDeleteAccount() {
  const { data } = useGetQuery("profile");

  const { setShowDeleteAccount } = useContext(AccountContext);
  const navigate = useNavigate();

  function handleDeleteAccount() {
    deleteUser(data.user);
  }

  function onCancel() {
    setShowDeleteAccount(false);
  }

  const { mutate: deleteUser, status: deleteAccountStatus } = useCustomMutation(
    deleteAccount,
    async () => {
      navigate("/log-in");
    },
    (err) => toast.error(err.message)
  );

  return (
    <>
      {deleteAccountStatus === "pending" ? (
        <Spinner />
      ) : (
        <ScreenOverlay>
          <Modal
            handleAction={handleDeleteAccount}
            handleCancel={onCancel}
            title="Delete Account?"
            bg="bg-accent-1"
            action="Yes, Delete"
            actionColor="error"
          >
            <p className="font-medium text-[11px] leading-[18px] text-grey-4">
              Are you sure you want to Deletet?
            </p>
          </Modal>
        </ScreenOverlay>
      )}
    </>
  );
}
