import { NavLink } from 'react-router-dom';
import { toBemClassName } from '../../../../utils/helpers';

export default function LinkItem({ path, label, bemBlock }) {
  return (
    <li
      className={toBemClassName({
        bemBlock,
        bemElem: 'container',
        bemMod: 'link',
      })}
    >
      <NavLink
        className={toBemClassName({ bemBlock, bemElem: 'link' })}
        to={path}
      >
        {label}
      </NavLink>
    </li>
  );
}
