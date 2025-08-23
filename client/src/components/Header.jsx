// Header.jsx

import React from "react";
import TitleBar from "./TitleBar";
import CartBar from "./CartBar";
import NavBar from "./NavBar";

export default function Header({itemCount, orderSubtotal}) {
  itemCount = 55;
  return (
    <>
      <div id='header-upper' className='flex row stretch-start'>
        <div id='title-container'>
          <TitleBar />
        </div>
        <div id='cart-container' className='flex row'>
          <CartBar itemCount={itemCount} orderSubtotal={orderSubtotal} />
        </div>
      </div>
      <div id='header-lower' className='flex row stretch-start'>
        <NavBar />
      </div>
    </>
  );
}
