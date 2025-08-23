// Header.jsx

import React from "react";
import SiteTitle from "./SiteTitle";
import Cart from "./Cart";
import NavBar from "./NavBar";

export default function Header({itemCount, orderSubtotal}) {
  itemCount = 55;
  return (
    <div className='header-wrapper'>
      <div id='header-upper' className='flex row stretch-start'>
        <div id='title-section'>
          <SiteTitle />
        </div>
        <div id='cart-section' className='flex row'>
          <Cart itemCount={itemCount} orderSubtotal={orderSubtotal} />
        </div>
      </div>
      <NavBar />
    </div>
  );
}
