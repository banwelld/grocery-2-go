// CartRow.jsx

import React from "react";
import { Link } from "react-router-dom";
import AcctField from "./AcctField";

export default function CartRow({ orderItem }) {
  const rowTotal = orderItem.quantity * orderItem.item.price;

  return (
    <Link to={`../items/${orderItem.item_id}`} className='cart-row items'>
      <div className='product'>
        <span className='img-wrapper-sq'>
          <img
            src={orderItem.item.image_url}
            alt={orderItem.item.name}
            className='img-fit-sq'
          />
        </span>
        <span className='name'>{orderItem.item.name}</span>
      </div>
      <AcctField className='price money' fieldAmt={orderItem.item.price} />
      <div className='qty'>{orderItem.quantity}</div>
      <AcctField className='row-total money' fieldAmt={rowTotal} />
    </Link>
  );
}
