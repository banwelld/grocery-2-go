// /client/src/form-schemas/paswordUpdateFormSettings.js

import { Key, Input, InputLabel } from "./enums";
import {
  validateConfirmPassword,
  validatePassword, 
  validateRequiredString,
} from "../validation-defs";

export default {
  formSchema: {
    [Key.PASSWORD]: {
      ...Input.PASSWORD,
      autoFocus: true,
      placeholder: InputLabel.PASSWORD_CURRENT,
    },
    [Key.PASSWORD_NEW]: {
      ...Input.PASSWORD,
      placeholder: InputLabel.PASSWORD_NEW,
    },
    [Key.PASSWORD_CONFIRM]: {
      ...Input.PASSWORD_CONFIRM,
      placeholder: InputLabel.PASSWORD_NEW_CONFIRM,
    },
  },
  initialValues: {
    [Key.PASSWORD]: "",
    [Key.PASSWORD_NEW]: "",
    [Key.PASSWORD_CONFIRM]: "",
  },
  validationMap: {
    [Key.PASSWORD]: validateRequiredString,
    [Key.PASSWORD_NEW]: validatePassword,
    [Key.PASSWORD_CONFIRM]: validateConfirmPassword,
  },
  hasSubmitButton: true,
  submitButtonLabel: "Update Password",
  bemMod: "password-update",
}