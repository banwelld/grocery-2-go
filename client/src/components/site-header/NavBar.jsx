// NavBar.jsx

import { useContext } from "react";
import { NavLink } from "react-router-dom";
import navLinks from "../site-header/nav-links.json";
import { UserContext } from "../../contexts/contexts";

export default function NavBar() {
  const { user, triggerLogout } = useContext(UserContext);
  const { fName } = user ?? { fName: "guest" };

  const filteredLinks = navLinks.filter((link) =>
    user ? link.visible !== "guest" : link.visible !== "member"
  );

  return (
    <nav>
      <ul>
        {filteredLinks.map((link) => (
          <li key={link.path}>
            <NavLink to={link.path}>{link.label}</NavLink>
          </li>
        ))}
      </ul>
      {user && (
        <div className='user-acknowledgment'>
          <span>Welcome {fName}!</span> <span onClick={triggerLogout}>Logout</span>
        </div>
      )}
    </nav>
  );
}
