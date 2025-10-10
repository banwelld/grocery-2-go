// AcctField.jsx

import { toDecimal } from "../helpers/helpers";

export default function AcctField({ fieldAmt, className }) {
  const decimalAmt = toDecimal(fieldAmt);
  return (
    <div className={className}>
      <span>$</span>
      <span>{decimalAmt}</span>
    </div>
  );
}
