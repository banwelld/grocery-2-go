// Header.jsx

import React, {useState} from "react";
import TitleBar from "./TitleBar";
import CartBar from "./CartBar";
import NavBar from "./NavBar";

export default function Header() {
  const [orderItems, setOrderItems] = useState(null);

  // TODO: delete this when actually building the function logic
  orderItems && setOrderItems(0);

  return (
    <>
      <div id='header-upper' className='flex row stretch-start'>
        <div id='title-container'>
          <TitleBar />
        </div>
        <div id='cart-container' className='flex row'>
          <CartBar />
        </div>
      </div>
      <div id='header-lower' className='flex row stretch-start'>
        <NavBar />
      </div>
    </>
  );
}
