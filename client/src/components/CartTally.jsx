// Cart.jsx

import React from "react";
import { Link } from "react-router-dom";

export default function Cart({ itemCount, orderSubtotal }) {
  return (
    <Link to={"/my-cart"}>
      <div className='tally wrapper'>
        <span className={`tally counter ${itemCount < 1 ? "empty" : ""}`}>
          {itemCount}
        </span>
        <img
          className='tally'
          src='../../images/shopping-basket-yellow.svg'
          id='shopping-cart-image'
          title='My shopping cart'
          alt={`shopping cart (${itemCount} item${itemCount !== 1 ? "s" : ""})`}
        />
      </div>
    </Link>
  );
}
