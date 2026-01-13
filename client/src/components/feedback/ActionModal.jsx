// /client/src/components/feedback/ConfirmationModal.jsx

import { useEffect, useRef } from "react";
import { toClassName } from "../../helpers/helpers";
import "./modal.css";

export default function ActionModal({
  children,
  isOpen,
  uiText = "",
  proceedLabel = "OK",
  closeLabel = "Cancel",
  proceed = () => { },
  onClose = () => { },
  bemBlock = "action-modal",
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    let timeoutId;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      requestAnimationFrame(() => {
        dialog.classList.add(`${bemBlock}--active`);
      });
    } else if (!isOpen && dialog.open) {
      dialog.classList.remove(`${bemBlock}--active`);
      timeoutId = setTimeout(() => dialog.close(), 300);
    }

    return () => clearTimeout(timeoutId);
  }, [isOpen, bemBlock]);

  const onProceed = () => {
    proceed();
    onClose();
  };

  return (
    <dialog ref={dialogRef} onClose={onClose} className={toClassName({ bemBlock })}>
      <div className={toClassName({ bemBlock, bemElem: "container", bemMod: "content" })}>
        {uiText}
      </div>
      {children && (
        <div className={toClassName({ bemBlock, bemElem: "container", bemMod: "children" })}>
          {children}
        </div>
      )}
      <div className={toClassName({ bemBlock, bemElem: "container", bemMod: "button" })}>
        <button
          onClick={onClose}
          className={toClassName({ bemBlock, bemElem: "button", bemMod: "cancel" })}
        >
          {closeLabel}
        </button>
        <button
          onClick={onProceed}
          className={toClassName({ bemBlock, bemElem: "button", bemMod: "confirm" })}
        >
          {proceedLabel}
        </button>
      </div>
    </dialog>
  );
}
