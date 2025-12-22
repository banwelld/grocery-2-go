// /client/src/pages/checkout/ConfirmationCheck.jsx

import { sectionText as st } from "../../../strings";
import { paragraphsFromArray } from "../../../helpers/helpers";

export default function ConfirmationCheck({ value, setterFn }) {
  const uiText = paragraphsFromArray(st.USER_INFO_CONFIRM);
  return (
    <div className='checkout__confirmation'>
      <label htmlFor='confirm-user'>
        <input
          id='confirm-user'
          className='checkout__checkbox'
          type='checkbox'
          checked={value}
          onChange={(e) => setterFn(e.target.checked)}
        />
        {uiText}
      </label>
    </div>
  );
}
