// /client/src/components/forms/FormikInput.jsx

import { useField } from "formik";

export default function FormikInput({
  label,
  as: Component = "input",
  children,
  ...props
}) {
  const [field, meta] = useField(props);
  return (
    <div
      className='input-wrapper'
      data-error={meta.touched && meta.error ? meta.error : ""}
    >
      <Component
        className={meta.touched && meta.error ? "error" : ""}
        {...field}
        {...props}
      >
        {children}
      </Component>
    </div>
  );
}
