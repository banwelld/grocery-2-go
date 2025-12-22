// /client/src/app/ModalContext.js

import { useState, useContext, createContext } from "react";
import { isValidString } from "../helpers/helpers";

export const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [modalPayload, setModalPayload] = useState(null);

  const openModal = ({
    uiText = null,
    confirmButtonLabel = "OK",
    cancelButtonLabel = "Cancel",
    onConfirmClick = () => {},
    onCancelClick = () => {},
  }) => {
    if (!isValidString(uiText))
      return console.warn(
        "Modal payload uiText param missing or invalid: expected string"
      );

    setModalPayload({
      uiText,
      confirmButtonLabel,
      cancelButtonLabel,
      onConfirmClick,
      onCancelClick,
    });
  };

  const killModal = () => setModalPayload(null);

  return (
    <ModalContext.Provider value={{ modalPayload, openModal, killModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
