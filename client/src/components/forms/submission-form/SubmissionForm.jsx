// /client/src/components/forms/submission-form/SubmissionForm.jsx

import { Formik, Form } from "formik";
import * as yup from "yup";
import FormikInput from "./FormikInput";
import Button from "../../ui/Button";
import { toClassName } from "../../../helpers/helpers";
import "./forms.css";

export default function SubmissionForm({
  onSubmit,
  formSchema,
  initialValues,
  validationMap,
  hasSubmitButton = true,
  submitButtonLabel = "Submit",
  formRef,
  id,
  bemBlock = "form",
  bemMod,
}) {
  const errors = [];

  if (!formSchema) errors.push("Cannot display form without formSchema.");
  if (!validationMap) errors.push("Cannot display form without validationMap.");
  if (!initialValues) errors.push("Cannot display form without initialValues.");
  if (!onSubmit) errors.push("Cannot submit form without onSubmit.");

  if (errors.length) {
    console.error(errors);
    return <p>** ERROR: Form settings are missing or invalid. **</p>;
  }

  const bemRoot = { bemBlock, bemMod };
  const validationSchema = yup.object(validationMap);

  const formikProps = {
    initialValues,
    validationSchema,
    onSubmit,
    innerRef: formRef
  };

  return (
    <Formik {...formikProps}>
      <Form className={toClassName({ ...bemRoot })} id={id}>
        {Object.entries(formSchema).map(([key, cfg]) => {
          const { Options } = cfg;
          const options = Options ? <Options /> : null;
          return (
            <FormikInput
              key={key}
              name={key}
              as={cfg.as}
              type={cfg.type}
              placeholder={cfg.placeholder}
              autoComplete={cfg.autocomplete}
              autoFocus={cfg.autoFocus ?? false}
              className={toClassName({ ...bemRoot, bemElem: "field" })}
            >
              {options}
            </FormikInput>
          );
        })}
        {hasSubmitButton && (
          <Button
            type="submit"
            className={toClassName({ ...bemRoot, bemElem: "button" })}
            label={submitButtonLabel}
          />
        )}
      </Form>
    </Formik>
  );
}
