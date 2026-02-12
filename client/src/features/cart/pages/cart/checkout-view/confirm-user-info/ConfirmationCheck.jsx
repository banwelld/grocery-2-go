import { toBemClassName } from '../../../../../../utils/helpers';
import { UiText } from '../../../../../../config/constants';

export default function ConfirmationCheck({ value, setState, bemRoot }) {
  const onChange = (e) => setState(e.target.checked);

  const inputProps = {
    id: 'user-info-checkbox',
    className: toBemClassName({ ...bemRoot, bemElem: 'checkbox' }),
    type: 'checkbox',
    checked: value,
    onChange,
  };

  return (
    <div className={toBemClassName({ ...bemRoot, bemElem: 'wrapper' })}>
      <label htmlFor='user-info-checkbox'>
        <input {...inputProps} />
        <span>{UiText.USER_INFO_CONFIRM}</span>
      </label>
    </div>
  );
}
