// /client/src/components/site-header/LinkItem.jsx

import { NavLink } from "react-router-dom";

export default function LinkItem({ path, label, bemBlock }) {
  return (
    <li className={`${bemBlock}__item-container`}>
      <NavLink className={`${bemBlock}__link`} to={path}>
        {label}
      </NavLink>
    </li>
  );
}
