// Register.jsx

import React, { useContext } from "react";
import { UserContext } from "../contexts";
import { Formik, Form } from "formik";
import CustomInput from "./CustomInput";
import { RegisterSchema } from "../form-schemas";
import { postData } from "../helpers";
import "../css/login-reg.css";
import "../css/forms.css";

export default function Register() {
  const { onLogin } = useContext(UserContext);

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
          onSubmit={(data) => postData("/users", data, onLogin)}
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
