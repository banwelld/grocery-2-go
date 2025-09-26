// CheckoutBtn.jsx

import React from "react";
import { useFormikContext } from "formik";

export default function CheckoutBtn({ actionFunc }) {
  const { values, submitForm } = useFormikContext();

  const handleCheckoutClick = (e) => {
    e.preventDefault();
    submitForm();
    actionFunc(e, null, 0, values);
  };

  return (
    <button
      type='button'
      className='checkout-btn'
      onClick={handleCheckoutClick}
      data-action='checkout'
    >
      Checkout
    </button>
  );
}
