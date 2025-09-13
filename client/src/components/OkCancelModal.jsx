// OkCancelModal.jsx

import React from "react";
import "../css/modal.css";

export default function Modal({
  isOpen = false,
  modalMsg = "",
  hasCancel = true,
  onOk = () => {},
  closeModal = () => {},
}) {
  if (!isOpen) return null;

  return (
    <div
      className='modal-overlay'
      onClick={(e) => {
        if (e.target.className.includes("modal-overlay")) {
          closeModal();
        }
      }}
    >
      <div className='modal'>
        <p>{modalMsg}</p>
        <button
          onClick={() => {
            onOk();
            closeModal();
          }}
        >
          OK
        </button>
        {hasCancel && <button onClick={closeModal}>Cancel</button>}
      </div>
    </div>
  );
}
