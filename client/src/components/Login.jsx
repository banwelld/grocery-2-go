// Login.jsx

import { useContext } from "react";
import { UserContext } from "../contexts/contexts";
import { Formik, Form } from "formik";
import * as yup from "yup";
import FormikInput from "../components/FormikInput";
import HeadingGroup from "./HeadingGroup";
import { Link } from "react-router-dom";
import { postData, toParagraphs } from "../helpers/helpers";
import msg from "../page-text.json";
import "../css/login-reg.css";
import "../css/forms.css";

export default function Login() {
  const { onLogin } = useContext(UserContext);

  const headingText = "Login";
  const message = toParagraphs(msg.LOGIN);

  const loginUser = (formData) => postData("/session", formData, onLogin);

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email.").required("** Required **"),
    password: yup.string().required("** Required **"),
  });

  return (
    <main className='login full-page'>
      <div className='wrapper'>
        <section className='welcome'>
          <HeadingGroup>
            {headingText}
            {message}
          </HeadingGroup>
          <Link className='text-link' to='../register'>
            Click here to create an account
          </Link>
        </section>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={loginUser}
        >
          <Form>
            <FormikInput
              type='email'
              tabIndex={1}
              placeholder='email address'
              name='email'
              autoFocus
            />
            <FormikInput
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
