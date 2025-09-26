// OkCancelModal.jsx

import React from "react";
import "../css/modal.css";

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
        <div className='text-container'>
          <p>{modalMsg}</p>
        </div>
        <div className='button-container'>
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
    </div>
  );
}
