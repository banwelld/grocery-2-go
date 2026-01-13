// /client/src/components/site-header/NavBarLayout.jsx

import LinkItem from "./LinkItem";
import { toClassName } from "../../helpers/helpers";

export default function NavBarLayout({ linkConfig, bemBlock }) {
  return (
    <ul className={toClassName({ bemBlock, bemElem: "list" })}>
      {linkConfig.map((link) => (
        <LinkItem
          label={link.label}
          path={link.path}
          bemBlock={bemBlock}
          key={link.path}
        />
      ))}
    </ul>
  );
}
