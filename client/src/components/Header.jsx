// Header.jsx

import React, {useState} from "react";
import TitleBar from "./TitleBar";
import CartBar from "./CartBar";
import NavBar from "./NavBar";
import AuthBar from "./AuthBar";

export default function Header() {
  const [orderItems, setOrderItems] = useState(null);

  // TODO: delete this when actually building the function logic
  orderItems && setOrderItems(0);

  return (
    <>
      <div id='header-upper' class='flex row stretch-start'>
        <div class='blue'>
          <TitleBar />
        </div>
        <div class='blue'>
          <CartBar />
        </div>
      </div>
      <div id='header-lower' class='flex row stretch-start'>
        <NavBar />
        <AuthBar />
      </div>
    </>
  );
}
