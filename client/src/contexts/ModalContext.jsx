// /client/src/app/ModalContext.js

import { useState, createContext } from "react";
import { isValidString } from "../helpers/helpers";

export const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [modalPayload, setModalPayload] = useState(null);

  const openModal = ({
    uiText = null,
    proceedLabel = "OK",
    closeLabel = "Cancel",
    proceed = () => { },
    onClose = () => { },
  }) => {
    if (!isValidString(uiText))
      return console.warn(
        "Modal payload uiText param missing or invalid: expected string"
      );

    setModalPayload({
      uiText,
      proceedLabel,
      closeLabel,
      proceed,
      onClose,
    });
  };

  const resetModal = () => setModalPayload(null);

  return (
    <ModalContext.Provider value={{ modalPayload, openModal, resetModal }}>
      {children}
    </ModalContext.Provider>
  );
}
