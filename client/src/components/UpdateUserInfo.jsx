// UpdateUser.jsx

import { Formik, Form } from "formik";
import FormikInput from "./FormikInput";
import { RegisterSchema } from "../form-schemas";
import { postData } from "../helpers/helpers";
import "../css/forms.css";

export default function UpdateUser({ user }) {
  const { id, email, fName, lName, phone } = user;

  return (
    <section className='update-user-info'>
      <Formik
        initialValues={{
          email: email,
          f_name: fName,
          l_name: lName,
          phone: phone,
        }}
        validationSchema={RegisterSchema}
        onSubmit={(data) => postData(`/users/${id}`, data)}
      >
        <Form>
          <FormikInput type='email' tabIndex={1} name='email' autoFocus />
          <FormikInput tabIndex={2} placeholder='first name' type='text' name='f_name' />
          <FormikInput tabIndex={3} placeholder='last name' type='text' name='l_name' />
          <FormikInput tabIndex={4} type='tel' name='phone' />
          <button tabIndex={7} type='submit'>
            Update Info
          </button>
        </Form>
      </Formik>
    </section>
  );
}
