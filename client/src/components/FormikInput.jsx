// FormikInput.jsx

import { useField } from "formik";

export default function FormikInput({ label, as = "input", ...props }) {
  const [field, meta] = useField(props);

  const Component = as;

  return (
    <div
      className='input-wrapper'
      data-error={meta.touched && meta.error ? meta.error : ""}
    >
      <Component
        className={meta.touched && meta.error ? "error" : ""}
        {...field}
        {...props}
      />
    </div>
  );
}
