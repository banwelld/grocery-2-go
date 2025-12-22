// /client/src/pages/usser-auth/deliveryInfoSchema.js

import {
  validateStreetAddress,
  validateCity,
  validateProvinceCd,
  validatePostalCd,
} from "../../validation-defs.js";
import ProvinceSelectOptions from "../../components/forms/province-selection/ProvinceSelectOptions.jsx";

export const deliveryInfoSchema = {
  inputs: {
    address: {
      type: "text",
      autoFocus: true,
      placeholder: "street address",
      initial: "",
      validate: validateStreetAddress,
    },
    city: {
      type: "text",
      autoFocus: false,
      placeholder: "city",
      initial: "",
      validate: validateCity,
      options: null,
    },
    province_cd: {
      as: "select",
      autoFocus: false,
      initial: "",
      validate: validateProvinceCd,
      options: <ProvinceSelectOptions />,
    },
    postal_cd: {
      type: "text",
      autoFocus: false,
      placeholder: "postal code",
      initial: "",
      validate: validatePostalCd,
    },
  },
  buttons: {
    submit: {
      type: "submit",
      label: "Submit Order!",
    },
  },
};
