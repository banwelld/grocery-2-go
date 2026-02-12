import { useState, createContext } from 'react';
import { isValidString, logException } from '../utils/helpers';
import Feedback from '../config/feedback';

const { Errors } = Feedback;

export const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [modalPayload, setModalPayload] = useState(null);

  const openModal = ({
    uiText = null,
    confirmLabel = 'OK',
    closeLabel = 'Cancel',
    handleConfirm = () => {},
    withClose = () => {},
    ...rest
  }) => {
    if (!isValidString(uiText))
      return logException(Errors.INVALID.DATA('string', typeof uiText), null);

    setModalPayload({
      uiText,
      confirmLabel,
      closeLabel,
      handleConfirm,
      withClose,
      ...rest,
    });
  };

  const resetModal = () => setModalPayload(null);

  return (
    <ModalContext.Provider value={{ modalPayload, openModal, resetModal }}>
      {children}
    </ModalContext.Provider>
  );
}
