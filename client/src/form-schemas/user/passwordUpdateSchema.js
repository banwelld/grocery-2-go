// /client/src/pages/usser-auth/passwordUpdateSchema.js

import { passwordInputs } from "./passwordInputs";
import { loginSchema } from "./loginSchema";

export const passwordUpdateSchema = {
  inputs: {
    currentPassword: { ...loginSchema.inputs.password, placeholder: "current password" },
    newPassword: { ...passwordInputs.password, placeholder: "new password" },
    confirmewPassword: {
      ...passwordInputs.confirmPassword,
      placeholder: "confirm new password",
    },
  },
  buttons: {
    submit: {
      type: "submit",
      label: "Update Password",
    },
  },
};
