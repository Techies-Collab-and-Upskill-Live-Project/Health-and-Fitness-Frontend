import { useContext } from "react";
import { AccountContext } from "../../../contexts/Account";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../services/apiAuths";
import { useCustomMutation } from "../../../hooks/useCustomMutation";
import toast from "react-hot-toast";
import ScreenOverlay from "../../../components/ScreenOverlay";
import Spinner from "../../../components/Spinner";
import { Modal } from "../Modal";

export function LogOut() {
  const { setShowLogOut } = useContext(AccountContext);
  const navigate = useNavigate();

  function handleLogOut() {
    logOut();
  }

  function onCancel() {
    setShowLogOut(false);
  }

  const { mutate: logOut, status: logOutStatus } = useCustomMutation(
    logoutUser,
    async () => {
      navigate("/log-in");
    },
    (err) => toast.error(err.message)
  );

  return (
    <ScreenOverlay>
      <>
        {logOutStatus === "pending" ? (
          <Spinner />
        ) : (
          <Modal
            handleAction={handleLogOut}
            handleCancel={onCancel}
            title="Log Out?"
            bg="bg-accent-1"
            action="Log Out"
            actionColor="error"
          >
            <p className="font-medium text-[11px] leading-[18px] text-grey-4">
              Are you sure you want to log out?
            </p>
          </Modal>
        )}
      </>
    </ScreenOverlay>
  );
}
