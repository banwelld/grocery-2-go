// /client/src/form-schemas/user/registerSchema.js

import { userInputs } from "./userInputs.js";
import { passwordInputs } from "./passwordInputs.js";

export const registerSchema = {
  inputs: { ...userInputs, ...passwordInputs },
  buttons: {
    update: {
      type: "submit",
      label: "Sign Me Up!",
    },
  },
};
