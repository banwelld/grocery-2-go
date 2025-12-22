// /client/src/components/forms/SubmissionForm.jsx

import { Formik, Form } from "formik";
import FormikInput from "./FormikInput.jsx";
import * as yup from "yup";

export default function SubmissionForm({ formSchema, onSubmit, bemBlock }) {
  const getAttrValues = (attr) =>
    Object.fromEntries(
      Object.entries(formSchema.inputs).map(([key, cfg]) => [key, cfg[attr]])
    );

  const initialValues = getAttrValues("initial");
  const validationValues = getAttrValues("validate");
  const validationSchema = yup.object(validationValues);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className={`form form--${bemBlock}`}>
        {Object.entries(formSchema?.inputs ?? {}).map(([key, cfg]) => (
          <FormikInput
            key={key}
            name={key}
            as={cfg.as}
            type={cfg.type}
            placeholder={cfg.placeholder}
            autoFocus={cfg.autoFocus ?? false}
            className='form__field'
            children={cfg.options}
          />
        ))}
        {Object.entries(formSchema?.buttons ?? {}).map(([key, cfg]) => (
          <button key={key} type={cfg.type} className='form__button'>
            {cfg.label}
          </button>
        ))}
      </Form>
    </Formik>
  );
}
