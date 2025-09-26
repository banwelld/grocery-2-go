// QuantityAdjustBtn.jsx

import React from "react";

export default function QuantityAdjustBtn({ action, content, actionFunc }) {
  return (
    <button
      className={`cart-mgmt-btn ${action}`}
      data-action={action}
      type={action === "checkout" ? "submit" : "button"}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        actionFunc(e);
      }}
    >
      {content}
    </button>
  );
}
