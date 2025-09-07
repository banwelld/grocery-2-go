// CartRow.jsx

import React from "react";
import { Link } from "react-router-dom";

export default function CartRow({ orderItem }) {
  return (
    <Link
      to={`../items/${orderItem.item_id}`}
      className='cart-row items'
      key={orderItem.item_id}
    >
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
      <div className='qty'>{orderItem.quantity}</div>
      <div className='price money'>
        <span>$</span>
        <span>{(orderItem.item.price / 100).toFixed(2)}</span>
      </div>
      <div className='row-total money'>
        <span>$</span>
        <span>{((orderItem.quantity * orderItem.item.price) / 100).toFixed(2)}</span>
      </div>
    </Link>
  );
}
