// /client/src/components/site-header/SiteHeader.jsx

import useUser from "../../hooks/useUser";

import HeaderBanner from "./HeaderBanner";
import HeaderTally from "./HeaderTally";
import NavBar from "./NavBar";
import UserAuth from "./UserAuth";

import { toClassName } from "../../helpers/helpers";
import "./site-header.css";

const bemBlock = "header";
const bemProps = { bemBlock, bemElem: "row" };

export default function SiteHeader() {
  const { user, userAuth: { logout } } = useUser();
  const { fName } = user ?? { fName: "Guest" };

  return (
    <div className={toClassName({ bemBlock })}>
      <div className={toClassName({ ...bemProps, bemMod: "upper" })}>
        <HeaderBanner {...bemProps} />
        <HeaderTally {...bemProps} />
      </div>
      <div className={toClassName({ ...bemProps, bemMod: "lower" })}>
        <NavBar user={user} {...bemProps} />
        <UserAuth {...{ fName, logout, ...bemProps }} />
      </div>
    </div>
  );
}
