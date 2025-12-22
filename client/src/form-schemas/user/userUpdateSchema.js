// /client/src/form-schemas/user/userUpdateSchema.js

import { userInputs } from "./userInputs.js";

export const userUpdateSchema = {
  inputs: { ...userInputs },
  buttons: {
    submit: {
      type: "submit",
      label: "Update Info",
    },
  },
};
