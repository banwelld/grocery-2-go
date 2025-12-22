// // /client/src/components/site-header/UserScoped.jsx

import { useContext } from "react";
import { UserContext } from "../../contexts/contexts";
import NavBar from "./NavBar";
import UserAck from "./UserAck";
import { toClassName } from "../../helpers/helpers";

export default function UserScoped({ bemBlock }) {
  const { user, logout } = useContext(UserContext);
  const { fName, role } = user ?? { fName: "Guest", role: "guest" };

  return (
    <div className={toClassName({ bemBlock, bemElem: "lower" })}>
      <NavBar {...{ role, bemBlock }} />
      <UserAck {...{ fName, logout, bemBlock }} />
    </div>
  );
}
