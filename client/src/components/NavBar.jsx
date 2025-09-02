// NavBar.jsx

import React from "react";
import { NavLink } from "react-router-dom";
import navLinks from "../nav-links.json";

export default function NavBar({ user }) {
  const links = navLinks.map((link) => (
    <li key={link.path}>
      <NavLink to={link.path}>{link.label}</NavLink>
    </li>
  ));

  return (
    <nav>
      <ul>{links}</ul>
      {user && `Welcome ${user.f_name} `}
    </nav>
  );
}
