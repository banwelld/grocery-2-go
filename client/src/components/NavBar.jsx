// NavBar.jsx

import React from "react";
import { NavLink } from "react-router-dom";
import navLinks from "../nav-links.json";

export default function NavBar({ user, logout }) {
  const links = navLinks.map((link) => (
    <li key={link.path}>
      <NavLink to={link.path}>{link.label}</NavLink>
    </li>
  ));

  return (
    <nav>
      <ul>{links}</ul>
      {user && (
        <>
          <span className='welcome-msg'>Welcome {user.f_name}!</span>{" "}
          <span className='logout-link' onClick={logout}>
            logout
          </span>
        </>
      )}
    </nav>
  );
}
