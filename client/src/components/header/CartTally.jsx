// openOrder.jsx

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { OpenOrderContext } from "../../contexts";

export default function CartTally() {
  const { itemCount } = useContext(OpenOrderContext);
  return (
    <Link to={"/my-cart"}>
      <div className='wrapper'>
        <span className={`counter ${itemCount < 1 ? "empty" : ""}`}>{itemCount}</span>
        <img
          src='../../images/shopping-basket-yellow.svg'
          id='shopping-cart-image'
          title='My shopping cart'
          alt={`shopping cart (${itemCount} item${itemCount !== 1 ? "s" : ""})`}
        />
      </div>
    </Link>
  );
}
