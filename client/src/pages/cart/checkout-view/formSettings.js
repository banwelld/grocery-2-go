// /client/src/pages/cart/checkout-mode/formSettings.js

import ProvinceSelectOptions from "../../../components/forms/province-selection/ProvinceSelectOptions.jsx"
import { Key, Input } from "../../../components/forms/enums.js"
import { 
  validateCity,
  validatePostalCd,
  validateProvinceCode,
  validateStreetAddress,
} from "../../../validation-defs.js"

const formSettings = {
  formSchema: {
    [Key.ADDRESS]: { ...Input.ADDRESS, autoFocus: true },
    [Key.CITY]: Input.CITY,
    [Key.PROVINCE_CD]: {
      ...Input.PROVINCE_CD, Options: ProvinceSelectOptions
    },
    [Key.POSTAL_CD]: Input.POSTAL_CD,
  },
  initialValues: {
    [Key.ADDRESS]: "",
    [Key.CITY]: "",
    [Key.POSTAL_CD]: "",
    [Key.PROVINCE_CD]: "",
  },
  validationMap: {
    [Key.ADDRESS]: validateStreetAddress,
    [Key.CITY]: validateCity,
    [Key.POSTAL_CD]: validatePostalCd,
    [Key.PROVINCE_CD]: validateProvinceCode,
  },
  hasSubmitButton: true,
  submitButtonLabel: "Submit",
  bemMod: "address",
}

export default formSettings
