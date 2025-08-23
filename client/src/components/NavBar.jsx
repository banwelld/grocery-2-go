// NavBar.jsx

import React from "react";
import {NavLink} from "react-router-dom";
import navBarLinkConfig from "../navBarLinkConfig.json";

export default function NavBar() {
  const navLinks = navBarLinkConfig.map((link) => (
    <NavLink key={link.path} to={link.path} className='nav-bar-link hov brighten'>
      {link.label}
    </NavLink>
  ));

  return (
    <div id='nav-bar' className='flex row'>
      {navLinks}
    </div>
  );
}
