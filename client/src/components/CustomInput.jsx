// CustomInput.jsx

import React from "react";
import { useField } from "formik";

export default function CustomInput({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div
      className='input-wrapper'
      data-error={meta.touched && meta.error ? meta.error : ""}
    >
      <input
        className={meta.touched && meta.error ? "error" : ""}
        {...field}
        {...props}
      />
    </div>
  );
}
