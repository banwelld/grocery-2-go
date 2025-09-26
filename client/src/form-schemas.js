// form-schemas.js

import * as yup from "yup";

export const submitOrderSchema = yup.object().shape({
  address: yup
    .string()
    .min(5, "5 characters min.")
    .test(
      "no-leading-trailing-spaces",
      "No leading or trailing spaces allowed",
      (value) => value === value?.trim()
    )
    .required("** Required **"),
  city: yup
    .string()
    .min(2, "2 characters min.")
    .max(20, "20 characters max.")
    .test(
      "no-leading-trailing-spaces",
      "No leading or trailing spaces allowed",
      (value) => value === value?.trim()
    )
    .required("** Required **"),
  province_cd: yup.string().required("** Required **"),
  postal_cd: yup
    .string()
    .required("** Required **")
    .test(
      "no-leading-trailing-spaces",
      "No leading or trailing spaces allowed",
      (value) => value === value?.trim()
    )
    .test("one-space-only", "Postal codes may only have one space.", (value) => {
      const spaceCount = value.length - value.replaceAll(" ", "").length;
      return spaceCount < 2;
    })
    .test(
      "six-characters-only",
      "Postal codes may only contain 6 characters.",
      (value) => {
        const codeLength = value.replaceAll(" ", "").length;
        return codeLength === 6;
      }
    )
    .test("validity", "Not a valid Canadian postal code", (value) =>
      /^([A-Za-z]\d){3}$/.test(value.replaceAll(" ", "") || "")
    ),
});

export const RegisterSchema = yup.object().shape({
  email: yup.string().email("Invalid email.").required("** Required **"),
  f_name: yup
    .string()
    .min(2, "2 characters min.")
    .max(20, "20 characters max.")
    .test(
      "no-leading-trailing-spaces",
      "No leading or trailing spaces allowed",
      (value) => value === value?.trim()
    )
    .required("** Required **"),
  l_name: yup
    .string()
    .min(2, "2 characters min.")
    .max(30, "30 characters max.")
    .test(
      "no-leading-trailing-spaces",
      "No leading or trailing spaces allowed",
      (value) => value === value?.trim()
    )
    .required("** Required **"),
  phone: yup
    .string()
    .required("** Required **")
    .test("length", "Must be exactly 10 digits", (value) => /^\d{10}$/.test(value || ""))
    .test("nanp-validation", "Not a valid phone number.", (value) => {
      if (!value) return false;
      return (
        value[0] !== "0" &&
        value[0] !== "1" &&
        value[3] !== "0" &&
        value[3] !== "1" &&
        value[1] !== value[2]
      );
    }),
  password: yup
    .string()
    .required("** Required **")
    .min(10, "Password must be at least 10 characters long")
    .test(
      "lowercase",
      "At least 1 lowercase letters",
      (value) => (value?.match(/[a-z]/g) || []).length >= 1
    )
    .test(
      "uppercase",
      "At least 1 uppercase letter",
      (value) => (value?.match(/[A-Z]/g) || []).length >= 1
    )
    .test("digit", "1 digit", (value) => (value?.match(/\d/g) || []).length >= 1)
    .test(
      "special",
      "At least 1 special characters",
      (value) => (value?.match(/[^A-Za-z0-9]/g) || []).length >= 1
    )
    .matches(/^\S*$/, "No spaces allowed"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match one another.")
    .required("** Required **"),
});
