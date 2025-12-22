// /client/src/components/site-header/SiteHeader.jsx

import HeaderBanner from "./HeaderBanner";
import HeaderTally from "./HeaderTally";
import UserScoped from "./UserScoped";
import "./site-header.css";

const BLOCK = "header";

export default function SiteHeader() {
  return (
    <div className={BLOCK}>
      <div className={`${BLOCK}__upper`}>
        <HeaderBanner bemBlock={BLOCK} />
        <HeaderTally bemBlock={BLOCK} />
      </div>
      <UserScoped bemBlock={BLOCK} />
    </div>
  );
}
