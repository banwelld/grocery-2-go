// SubmissionForm.jsx

import { Formik, Form } from "formik";
import FormikInput from "../FormikInput";
import ProvinceInput from "./ProvinceInput";
import { submitOrderSchema } from "../../form-schemas";
import act from "../../basket-actions.json";

export default function SubmissionForm({ onCheckoutClick }) {
  const onSubmit = (values) => {
    console.log(values);
    onCheckoutClick(values);
  };

  return (
    <Formik
      initialValues={{
        address: "",
        city: "",
        province_cd: "",
        postal_cd: "",
      }}
      onSubmit={onSubmit}
      validationSchema={submitOrderSchema}
    >
      <Form>
        <FormikInput type='text' placeholder='street address' name='address' />
        <FormikInput placeholder='city' type='text' name='city' />
        <ProvinceInput />
        <FormikInput placeholder='postal code' type='text' name='postal_cd' />
        <button type='submit'>Submit Order</button>
      </Form>
    </Formik>
  );
}
