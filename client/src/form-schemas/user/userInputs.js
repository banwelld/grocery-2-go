// /client/src/pages/usser-auth/userInputs.js

import { validateEmail, validateName, validatePhone } from "../../validation-defs.js";

export const userInputs = {
  email: {
    type: "email",
    autoFocus: true,
    placeholder: "email address",
    initial: "",
    validate: validateEmail,
  },
  f_name: {
    type: "text",
    autoFocus: false,
    placeholder: "first name",
    initial: "",
    validate: validateName,
  },
  l_name: {
    type: "text",
    autoFocus: false,
    placeholder: "last name",
    initial: "",
    validate: validateName,
  },
  phone: {
    type: "tel",
    autoFocus: false,
    placeholder: "telephone number",
    initial: "",
    validate: validatePhone,
  },
};
