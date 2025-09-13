// Cart.jsx

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { OrderContext } from "../../contexts";
import { countOrderItems } from "../../helpers";

export default function CartTally() {
  const { openOrder } = useContext(OrderContext);

  const itemCount = countOrderItems(openOrder.order_items);

  return (
    <Link to={"/my-cart"} className={itemCount === 0 ? "empty" : ""}>
      <div className='wrapper' data-count={itemCount}>
        <img
          src='../../images/shopping-basket-yellow.svg'
          className='cart-img'
          alt={`shopping cart (${itemCount} item${itemCount !== 1 ? "s" : ""} item${
            itemCount > 0 && "s"
          })`}
        />
      </div>
    </Link>
  );
}
