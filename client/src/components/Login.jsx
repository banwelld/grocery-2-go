// Login.jsx

import React, { useContext } from "react";
import { UserContext } from "../contexts";
import { Formik, Form } from "formik";
import * as yup from "yup";
import CustomInput from "./CustomInput";
import { Link } from "react-router-dom";
import { toCamelCase } from "../helpers";
import "../css/login-reg.css";
import "../css/forms.css";

export default function Login() {
  const { onLogin } = useContext(UserContext);

  const loginUser = (formData, onLogin, camelCaseFunc) => {
    fetch("/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (ok) {
          onLogin(camelCaseFunc(data));
        } else {
          alert(`Error (login/register): ${data.error}`);
        }
      });
  };

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email.").required("** Required **"),
    password: yup.string().required("** Required **"),
  });

  return (
    <main className='login full-page'>
      <div className='wrapper'>
        <section className='welcome'>
          <h1>Login</h1>
          <div className='message'>
            <p>
              In order to provide you with items of the highest quality and at the best
              prices, we must have an active and engaged membership. As such, you'll need
              to login to the site to take advantage of <strong>Grocery2Go's</strong>{" "}
              benefits.
            </p>
            <p>
              <strong>Not a member yet?</strong> We'd love to have you sign up!{" "}
              <Link className='text-link' to='../register'>
                Click here
              </Link>{" "}
              to create an account.
            </p>
          </div>
        </section>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={(data) => loginUser(data, onLogin, toCamelCase)}
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
              tabIndex={5}
              placeholder='password'
              type='password'
              name='password'
            />
            <button tabIndex={7} type='submit' className='shadow'>
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </main>
  );
}
