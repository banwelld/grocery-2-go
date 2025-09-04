// MyCart.jsx

import React from "react";
import { useOutletContext } from "react-router-dom";

export default function MyCart() {
  const { cart } = useOutletContext();

  const items = cart.order_items;

  const itemRows = items.map((i) => {
    return (
      <div key={i.id} className='cart-items'>
        <span>Item ID: {i.item_id}</span>
        <span>Price: ${i.price / 100}</span>
        <span>Quantity: {i.quantity}</span>
      </div>
    );
  });
  return (
    <div className='my-cart'>
      <h1>My Cart</h1>
      {itemRows}
    </div>
  );
}
