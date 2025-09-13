// QtyAdj.jsx

import React, { useContext } from "react";
import { OrderContext } from "../contexts";

export default function QtyAdj({ itemId }) {
  const { OpenOrder, setOpenOrder } = useContext(OrderContext);

  const order_item =
    OpenOrder?.order_items.find((i) => i.item_id === Number(itemId)) || {};
  const quantity = order_item?.quantity ?? 0;

  const startOrder = (user_id) => {
    fetch("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user_id: user_id }),
    })
      .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (ok) {
          setOpenOrder(data);
        } else {
          alert(`Error: ${data.error}`);
        }
      });
  };

  const addItem = () => {};

  return (
    <div className='qty-adjust'>
      <button className='add'>+</button>
      <span>{quantity}</span>
      <button className='subtract'>-</button>
    </div>
  );
}
