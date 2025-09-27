// MyCartSidebar.jsx

import React from "react";
import Heading from "../info-page/Heading";

export default function MyCartSidebar({ formVisible, setFormVisible }) {
  const toggleFormClassVisible = () => setFormVisible(!formVisible);
  const submitButtonText = !formVisible ? "Submit Order" : "View Cart";

  return (
    <div className='my-cart-sidebar'>
      <Heading text='Options' isPgHead={false} />
      <div className='cart-options'>
        <button
          type='button'
          className='cart-options-btn'
          onClick={toggleFormClassVisible}
        >
          {submitButtonText}
        </button>
      </div>
    </div>
  );
}
