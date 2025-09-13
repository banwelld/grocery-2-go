// AcctField.jsx

import React from "react";
import { toDecimal } from "../../helpers";

export default function AcctField({ fieldAmt, className }) {
  return (
    <div className={className}>
      <span>$</span>
      <span>{toDecimal(fieldAmt)}</span>
    </div>
  );
}
