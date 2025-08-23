// Cart.jsx

import React from "react";
import {Link} from "react-router-dom";

export default function Cart({itemCount, orderSubtotal}) {
  return (
    <Link to={"/my-cart"}>
      <div id='cart-wrapper' className={"hov brighten scale-up-sm"}>
        <img
          src='../../images/shopping-cart-yellow.svg'
          alt='shopping cart icon'
          title='My shopping cart'
          id='shopping-cart'
        />
        <span className={`item-count ${itemCount > 0 && "active"}`}>{itemCount}</span>
      </div>
    </Link>
  );
}
