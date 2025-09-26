// Cart.jsx

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { OrderContext } from "../../contexts";
import { countOrderItems } from "../../helpers";

export default function CartTally() {
  const { cartItems } = useContext(OrderContext);

  const itemCount = countOrderItems(cartItems);

  return (
    <Link to={"/my-cart"} className={itemCount === 0 ? "empty" : ""}>
      <div className='wrapper' data-count={itemCount}>
        <img src='../../images/shopping-basket-yellow.svg' alt='fuck you' />
      </div>
    </Link>
  );
}
