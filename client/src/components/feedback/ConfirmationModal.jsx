// /client/src/components/feedback/ConfirmationModal.jsx

import { useEffect, useRef } from "react";
import { toClassName } from "../../helpers/helpers";
import "../../css/modal.css";

const BLOCK = "confirmation-modal";

export default function ConfirmationModal({
  isOpen,
  uiText = "",
  confirmButtonLabel = "OK",
  cancelButtonLabel = "Cancel",
  onConfirmClick = () => {},
  onCancelClick = () => {},
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      requestAnimationFrame(() => {
        dialog.classList.add("confirmation-modal--active");
      });
    } else if (!isOpen && dialog.open) {
      dialog.classList.remove("confirmation-modal--active");
      setTimeout(() => dialog.close(), 300);
    }
  }, [isOpen]);

  const handleConfirmClick = () => {
    onConfirmClick();
    onCancelClick();
  };

  return (
    <dialog ref={dialogRef} className={BLOCK}>
      <div className={toClassName({ bemBlock: BLOCK, bemElem: "text-container" })}>
        {uiText}
      </div>
      <div className={toClassName({ bemBlock: BLOCK, bemElem: "button-container" })}>
        <button
          className={toClassName({
            bemBlock: BLOCK,
            bemElem: "button",
            bemMod: "confirm",
          })}
          onClick={handleConfirmClick}
        >
          {confirmButtonLabel}
        </button>
        <button
          className={toClassName({
            bemBlock: BLOCK,
            bemElem: "button",
            bemMod: "cancel",
          })}
          onClick={onCancelClick}
        >
          {cancelButtonLabel}
        </button>
      </div>
    </dialog>
  );
}
