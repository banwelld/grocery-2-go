// /client/src/pages/usser-auth/passwordInputs.js

import { validatePassword, validateConfirmPassword } from "../../validation-defs.js";

export const passwordInputs = {
  password: {
    type: "password",
    autoFocus: false,
    placeholder: "password",
    initial: "",
    validate: validatePassword,
  },
  confirmPassword: {
    type: "password",
    autoFocus: false,
    placeholder: "confirm password",
    initial: "",
    validate: validateConfirmPassword,
  },
};
