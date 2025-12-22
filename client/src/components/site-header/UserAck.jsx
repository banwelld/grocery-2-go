// /client/src/components/site-header/UserAck.jsx

import { useModal } from "../../contexts/ModalContext";
import { modalText as mt } from "../../strings";

export default function UserAck({ fName, logout, bemBlock }) {
  const { openModal, killModal } = useModal();

  const isGuest = fName === "Guest";

  const modalProps = {
    uiText: mt.LOGOUT_MODAL,
    confirmButtonLabel: "Yes",
    cancelButtonLabel: "No",
    onConfirmClick: logout,
    onCancelClick: killModal,
  };

  const handleClick = () => openModal({ ...modalProps });

  return (
    <div className={`${bemBlock}__user-ack`}>
      <p className='user-ack__welcome'>
        Welcome {fName}! {isGuest && "Login or Register to order."}
        {!isGuest && (
          <button type='button' className='user-ack__logout' onClick={handleClick}>
            Logout
          </button>
        )}
      </p>
    </div>
  );
}
