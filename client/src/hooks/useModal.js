// /client/src/app/ModalContext.js

import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";

export const useModal = () => useContext(ModalContext);
