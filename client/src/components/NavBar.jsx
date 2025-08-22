// NavBar.jsx

import React from "react";
import {NavLink} from "react-router-dom";
import Login from "./Login";
import navBarLinkConfig from "../navBarLinkConfig.json";

export default function NavBar() {
  const navLinks = navBarLinkConfig.map((link) => (
    <NavLink
      key={link.path}
      to={link.path}
      className='nav-bar-link hov brighten scale-up-sm'
    >
      {link.linkText}
    </NavLink>
  ));

  return (
    <>
      <div id='nav-container' className='flex row'>
        {navLinks}
      </div>
      <div id='auth-container' className='flex row'>
        <Login />
        <NavLink to='/new-user' className='nav-bar-link hov brighten scale-up-sm'>
          Create account
        </NavLink>
      </div>
    </>
  );
}
