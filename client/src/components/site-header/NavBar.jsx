// /client/src/components/site-header/NavBar.jsx

import LinkItem from "./LinkItem";
import { navLinkConfig } from "./navLinkConfig";

export default function NavBar({ role, bemBlock, bemElem = "nav-bar" }) {
  const userScopedLinks = navLinkConfig.filter(
    (link) => link.visible === role || link.visible === "all"
  );
  return (
    <nav className={`${bemBlock}__${bemElem}`}>
      <ul className={`${bemElem}__list`}>
        {userScopedLinks.map((link) => (
          <LinkItem
            label={link.label}
            path={link.path}
            bemBlock={bemElem}
            key={link.path}
          />
        ))}
      </ul>
    </nav>
  );
}
