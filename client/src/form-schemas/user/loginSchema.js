// /client/src/pages/usser-auth/loginSchema.js

import { validateRequiredString } from "../../validation-defs.js";

export const loginSchema = {
  inputs: {
    email: {
      type: "email",
      autoFocus: true,
      placeholder: "email address",
      initial: "",
      validate: validateRequiredString,
    },
    password: {
      type: "password",
      autoFocus: false,
      placeholder: "password",
      initial: "",
      validate: validateRequiredString,
    },
  },
  buttons: {
    submit: {
      type: "submit",
      label: "Login",
    },
  },
};
