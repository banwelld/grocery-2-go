// Register.jsx

import React, { useContext } from "react";
import { UserContext } from "../contexts";
import { Formik, Form } from "formik";
import * as yup from "yup";
import CustomInput from "./CustomInput";
import "../css/login-reg.css";
import "../css/forms.css";

export default function Login() {
  const { loginRegisterUser } = useContext(UserContext);

  const RegisterSchema = yup.object().shape({
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
      .test("length", "Must be exactly 10 digits", (value) =>
        /^\d{10}$/.test(value || "")
      )
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

  return (
    <main className='registration full-page'>
      <div className='wrapper'>
        <section className='welcome'>
          <h1>Registration</h1>
          <div className='message'>
            <p>
              We're thrilled that you've decided to create an account! Just give us a
              little info about yourself and you'll be all ready to load up a shopping
              cart.
            </p>
            <p>
              All fields are mandatory so make sure your form is complete. Make sure that
              your password has at least 10 characters with a lowercase and uppercase
              character, a digit and a special character (e.g., !@#$%).
            </p>
          </div>
        </section>
        <Formik
          initialValues={{
            email: "",
            f_name: "",
            l_name: "",
            phone: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={(data) => loginRegisterUser("/register", data)}
        >
          <Form>
            <CustomInput
              type='email'
              tabIndex={1}
              placeholder='email address'
              name='email'
              autoFocus
            />
            <CustomInput
              tabIndex={2}
              placeholder='first name'
              type='text'
              name='f_name'
            />
            <CustomInput tabIndex={3} placeholder='last name' type='text' name='l_name' />
            <CustomInput
              tabIndex={4}
              placeholder='phone number (digits only)'
              type='tel'
              name='phone'
            />
            <CustomInput
              tabIndex={5}
              placeholder='password'
              type='password'
              name='password'
            />
            <CustomInput
              tabIndex={6}
              placeholder='confirm password'
              type='password'
              name='confirmPassword'
            />
            <button tabIndex={7} type='submit'>
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </main>
  );
}
