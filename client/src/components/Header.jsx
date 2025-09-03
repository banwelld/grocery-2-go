// Header.jsx

import React from "react";
import Branding from "./Branding";
import CartTally from "./CartTally";
import NavBar from "./NavBar";

export default function Header({ itemCount, user, logout }) {
  return (
    <div className='header wrapper'>
      <div className='header upper-row'>
        <div className='header branding'>
          <Branding />
        </div>
        <div className='header tally'>
          {/* TODO: remove the hard number and put in {itemCount} */}
          <CartTally itemCount={2} />
        </div>
      </div>
      <NavBar className='header' user={user} logout={logout} />
    </div>
  );
}
