// /client/src/components/forms/enums.js

export const Key = Object.freeze({
  ADDRESS: "address",
  CITY: "city",
  EMAIL: "email",
  NAME_FIRST: "fName",
  NAME_LAST: "lName",
  PASSWORD: "password",
  PASSWORD_CONFIRM: "confirmPassword",
  PASSWORD_NEW: "newPassword",
  PROVINCE_CD: "provinceCd",
  POSTAL_CD: "postalCd",
  PHONE: "phone",
});

export const InputType = Object.freeze({
  EMAIL: "email",
  INPUT: "input",
  PASSWORD: "password",
  PHONE: "tel",
  SELECT: "select",
  TEXT: "text",
});

export const InputKey = Object.freeze({
  ADDRESS: "ADDRESS",
  CITY: "CITY",
  EMAIL: "EMAIL",
  NAME_FIRST: "NAME_FIRST",
  NAME_LAST: "NAME_LAST",
  PASSWORD: "PASSWORD",
  PASSWORD_CONFIRM: "PASSWORD_CONFIRM",
  PHONE: "PHONE",
  PROVINCE_CD: "PROVINCE_CD",
  POSTAL_CD: "POSTAL_CD",
});

export const InputLabel = Object.freeze({
  [InputKey.ADDRESS]: "street address",
  [InputKey.CITY]: "city",
  [InputKey.EMAIL]: "email address",
  [InputKey.NAME_FIRST]: "first name",
  [InputKey.NAME_LAST]: "last name",
  [InputKey.PASSWORD]: "password",
  [InputKey.PASSWORD_CONFIRM]: "confirm password",
  PASSWORD_CURRENT: "current password",
  PASSWORD_NEW: "new password",
  PASSWORD_NEW_CONFIRM: "confirm new password",
  [InputKey.PHONE]: "phone number",
  [InputKey.POSTAL_CD]: "postal code"
});

export const Input = Object.freeze({
  [InputKey.ADDRESS]: {
    type: InputType.TEXT,
    as: InputType.INPUT,
    placeholder: InputLabel.ADDRESS,
    autocomplete: "street-address",
  },
  [InputKey.CITY]: {
    type: InputType.TEXT,
    as: InputType.INPUT,
    placeholder: InputLabel.CITY,
    autocomplete: "address-level2",
  },
  [InputKey.EMAIL]: {
    type: InputType.EMAIL,
    as: InputType.INPUT,
    placeholder: InputLabel.EMAIL,
    autocomplete: "email",
  },
  [InputKey.NAME_FIRST]: {
    type: InputType.TEXT,
    as: InputType.INPUT,
    placeholder: InputLabel.NAME_FIRST,
    autocomplete: "given-name",
  },
  [InputKey.NAME_LAST]: {
    type: InputType.TEXT,
    as: InputType.INPUT,
    placeholder: InputLabel.NAME_LAST,
    autocomplete: "family-name",
  },
  [InputKey.PASSWORD]: {
    type: InputType.PASSWORD,
    as: InputType.INPUT,
    placeholder: InputLabel.PASSWORD,
    autocomplete: "current-password",
  },
  [InputKey.PASSWORD_CONFIRM]: {
    type: InputType.PASSWORD,
    as: InputType.INPUT,
    placeholder: InputLabel.PASSWORD_CONFIRM,
    autocomplete: "new-password",
  },
  [InputKey.PHONE]: {
    type: InputType.PHONE,
    as: InputType.INPUT,
    placeholder: InputLabel.PHONE,
    autocomplete: "tel",
  },
  [InputKey.POSTAL_CD]: {
    type: InputType.TEXT,
    as: InputType.INPUT,
    placeholder: InputLabel.POSTAL_CD,
    autocomplete: "postal-code",
  },
  [InputKey.PROVINCE_CD]: {
    type: null,
    as: InputType.SELECT,
    placeholder: null,
    autocomplete: "address-level1",
  },
});