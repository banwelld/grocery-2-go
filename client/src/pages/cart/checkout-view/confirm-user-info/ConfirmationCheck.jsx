// /client/src/pages/checkout/ConfirmationCheck.jsx

import { toClassName } from "../../../../helpers/helpers";
import { uiText } from "../../../../strings";

export default function ConfirmationCheck({ value, setState, bemRoot }) {
  const onChange = (e) => setState(e.target.checked);

  const inputProps = {
    id: 'user-info-checkbox',
    className: toClassName({ ...bemRoot, bemElem: "checkbox" }),
    type: "checkbox",
    checked: value,
    onChange
  }

  return (
    <div className={toClassName({ ...bemRoot, bemElem: "wrapper" })}>
      <label htmlFor='user-info-checkbox'>
        <input {...inputProps} />
        <span>{uiText.USER_INFO_CONFIRM}</span>
      </label>
    </div>
  );
}
