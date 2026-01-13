// /client/src/form-schemas/loginSettings.js

import { Key, Input } from "../components/forms/enums.js";
import { validateEmail, validatePassword } from "../validation-defs.js";

const loginSettings = {
  formSchema: {
    [Key.EMAIL]: { ...Input.EMAIL, autoFocus: true },
    [Key.PASSWORD]: Input.PASSWORD,
  },
  initialValues: {
    [Key.EMAIL]: "",
    [Key.PASSWORD]: "",
  },
  validationMap: {
    [Key.EMAIL]: validateEmail,
    [Key.PASSWORD]: validatePassword,
  },
  hasSubmitButton: true,
  submitButtonLabel: "Login",
  bemMod: "login",
};

export default loginSettings;
