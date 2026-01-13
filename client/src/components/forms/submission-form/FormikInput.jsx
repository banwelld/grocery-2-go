// /client/src/components/forms/FormikInput.jsx

import { useField } from "formik";

export default function FormikInput({
  label,
  as = "input",
  children,
  ...props
}) {
  const [field, meta] = useField(props);
  const isError = meta.touched && meta.error;

  const Component = as;

  return (
    <div
      className='input-wrapper'
      data-error={isError ? meta.error : ""}
    >
      <Component
        className={isError ? "error" : ""}
        {...field}
        {...props}
      >
        {children}
      </Component>
    </div>
  );
}
