// /client/src/components/site-header/LinkItem.jsx

import { NavLink } from "react-router-dom";
import { toClassName } from "../../helpers/helpers";

export default function LinkItem({ path, label, bemBlock }) {
  return (
    <li className={toClassName({ bemBlock, bemElem: "container", bemMod: "link" })}>
      <NavLink className={toClassName({ bemBlock, bemElem: "link" })} to={path}>
        {label}
      </NavLink>
    </li>
  );
}
