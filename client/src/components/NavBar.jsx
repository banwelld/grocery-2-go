// NavBar.jsx

import React from "react";
import { NavLink } from "react-router-dom";
import navLinks from "../nav-links.json";

export default function NavBar({ user, triggerLogout }) {
  const links = navLinks
    .filter((link) => (user ? link.visible !== "guest" : link.visible !== "member"))
    .map((link) => (
      <li key={link.path}>
        <NavLink to={link.path}>{link.label}</NavLink>
      </li>
    ));

  return (
    <nav>
      <ul>{links}</ul>
      {user && (
        <div className='user-acknowledgment'>
          <span>Welcome {user.f_name}!</span> <span onClick={triggerLogout}>Logout</span>
        </div>
      )}
    </nav>
  );
}
