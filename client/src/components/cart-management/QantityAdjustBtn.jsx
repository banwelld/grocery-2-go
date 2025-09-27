// QuantityAdjustBtn.jsx

import React from "react";

export default function QuantityAdjustBtn({ action, content, cartMgmtFunc }) {
  return (
    <button
      className={`cart-mgmt-btn ${action}`}
      data-action={action}
      type={action === "checkout" ? "submit" : "button"}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        cartMgmtFunc(e);
      }}
    >
      {content}
    </button>
  );
}
