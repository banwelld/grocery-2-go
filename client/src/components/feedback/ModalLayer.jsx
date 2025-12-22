// /client/src/app/ModalLayer.js

import { useModal } from "../../contexts/ModalContext";
import ConfirmationModal from "../feedback/ConfirmationModal";

export default function ModalLayer() {
  const { modalPayload, killModal } = useModal();

  if (!modalPayload) return null;

  return (
    <ConfirmationModal
      isOpen={!!modalPayload}
      uiText={modalPayload.uiText}
      confirmButtonLabel={modalPayload.confirmButtonLabel}
      cancelButtonLabel={modalPayload.cancelButtonLabel}
      onConfirmClick={() => {
        modalPayload.onConfirmClick();
        killModal();
      }}
      onCancelClick={() => {
        modalPayload.onCancelClick();
        killModal();
      }}
    />
  );
}
