// Header.jsx

import React from "react";
import Branding from "./Branding";
import CartTally from "./CartTally";
import NavBar from "./NavBar";

export default function Header({ itemCount, user }) {
  return (
    <div className='header'>
      <div className='upper-row'>
        <div className='branding'>
          <Branding />
        </div>
        <div className='cart-tally'>
          {/* TODO: remove the hard number and put in {itemCount} */}
          <CartTally itemCount={2} />
        </div>
      </div>
      <NavBar user={user} />
    </div>
  );
}
