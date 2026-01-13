// /client/src/components/site-header/NavBar.jsx

import { useMemo } from "react";
import useNavVisibility from "../../hooks/useNavVisibility";
import NavBarLayout from "./NavBarLayout";
import { getLinkConfig } from "./navLinkConfig";
import { toClassName } from "../../helpers/helpers";

import "./nav-bar.css";

export default function NavBar({ user = null }) {
  const { role } = user ?? { role: "guest" };

  const linkConfig = useMemo(() => {
    return getLinkConfig(user ?? { id: 0 });
  }, [user]);

  const visibleLinkConfig = useNavVisibility(linkConfig, role);

  return (
    <nav className={toClassName({ bemBlock: "nav-bar" })}>
      <NavBarLayout linkConfig={visibleLinkConfig} bemBlock="nav-bar" />
    </nav >
  );
}
