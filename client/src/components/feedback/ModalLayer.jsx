// /client/src/app/ModalLayer.js

import { useModal } from "../../hooks/useModal";
import ActionModal from "./ActionModal";

export default function ModalLayer() {
  const { modalPayload, resetModal } = useModal();

  if (!modalPayload) return null;

  return (
    <ActionModal
      isOpen={!!modalPayload}
      uiText={modalPayload.uiText}
      children={modalPayload.children}
      proceedLabel={modalPayload.proceedLabel}
      closeLabel={modalPayload.closeLabel}
      proceed={() => {
        modalPayload.proceed();
        resetModal();
      }}
      onClose={() => {
        modalPayload.onClose();
        resetModal();
      }}
    />
  );
}
