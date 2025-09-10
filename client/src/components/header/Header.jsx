// Header.jsx

import React from "react";
import Branding from "./Branding";
import CartTally from "./CartTally";
import NavBar from "./NavBar";
import "../../css/header.css";

export default function Header() {
  return (
    <div className='header'>
      <div className='upper'>
        <div className='branding'>
          <Branding />
        </div>
        <div className='cart-tally'>
          <CartTally />
        </div>
      </div>
      <NavBar />
    </div>
  );
}
