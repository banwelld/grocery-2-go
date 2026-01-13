// /client/src/form-schemas/user/registerFormSettings.js

import { Key, Input } from "../components/forms/enums.js";
import {
  validateEmail,
  validateRequiredString,
  validatePhone,
  validatePassword,
  validateConfirmPassword
} from "../validation-defs.js";

const registrationFormSettings = {
  formSchema: {
    [Key.EMAIL]: { ...Input.EMAIL, autoFocus: true },
    [Key.NAME_FIRST]: Input.NAME_FIRST,
    [Key.NAME_LAST]: Input.NAME_LAST,
    [Key.PHONE]: Input.PHONE,
    [Key.PASSWORD]: { ...Input.PASSWORD, autocomplete: "new-password" },
    [Key.PASSWORD_CONFIRM]: { ...Input.PASSWORD_CONFIRM, autocomplete: "new-password" }
  },
  initialValues: {
    [Key.EMAIL]: "",
    [Key.NAME_FIRST]: "",
    [Key.NAME_LAST]: "",
    [Key.PHONE]: "",
    [Key.PASSWORD]: "",
    [Key.PASSWORD_CONFIRM]: "",
  },
  validationMap: {
    [Key.EMAIL]: validateEmail,
    [Key.NAME_FIRST]: validateRequiredString,
    [Key.NAME_LAST]: validateRequiredString,
    [Key.PHONE]: validatePhone,
    [Key.PASSWORD]: validatePassword,
    [Key.PASSWORD_CONFIRM]: validateConfirmPassword,
  },
  hasSubmitButton: true,
  submitButtonLabel: "Register",
  bemMod: "registration"
}

export default registrationFormSettings
