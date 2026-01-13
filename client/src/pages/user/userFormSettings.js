// /client/src/pages/user/userFormSettings.js

import { Key, Input } from "../../components/forms/enums.js";
import {
  validateEmail,
  validateRequiredString,
  validatePhone
} from "../../validation-defs.js";

const userFormSettings = {
  formSchema: {
    [Key.EMAIL]: { ...Input.EMAIL, autoFocus: true },
    [Key.NAME_FIRST]: Input.NAME_FIRST,
    [Key.NAME_LAST]: Input.NAME_LAST,
    [Key.PHONE]: Input.PHONE,
  },
  initialValues: {
    [Key.EMAIL]: "",
    [Key.NAME_FIRST]: "",
    [Key.NAME_LAST]: "",
    [Key.PHONE]: "",
  },
  validationMap: {
    [Key.EMAIL]: validateEmail,
    [Key.NAME_FIRST]: validateRequiredString,
    [Key.NAME_LAST]: validateRequiredString,
    [Key.PHONE]: validatePhone,
  },
};

export default userFormSettings;
