// CartBar.jsx

import React from "react";
import {Link} from "react-router-dom";

export default function CartBar() {
  return (
    <Link to={"/my-cart"} class='hov brighten scale-up-sm'>
      <img
        src='../../images/shopping-cart-yellow.svg'
        alt='shopping cart icon'
        title='My shopping cart'
        id='shopping-cart'
      />
    </Link>
  );
}
