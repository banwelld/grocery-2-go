// OkCancelModal.jsx

import React from "react";

export default function Modal({
  isOpen = false,
  modalMsg = "",
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
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
}
