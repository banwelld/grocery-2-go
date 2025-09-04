// Header.jsx

import React from "react";
import Branding from "./Branding";
import CartTally from "./CartTally";
import NavBar from "./NavBar";

export default function Header({ itemCount, user, triggerLogout }) {
  return (
    <div className='header wrapper'>
      <div className='header upper-row'>
        <div className='header branding'>
          <Branding />
        </div>
        <div className='header tally'>
          <CartTally itemCount={itemCount} />
        </div>
      </div>
      <NavBar className='header' user={user} triggerLogout={triggerLogout} />
    </div>
  );
}
