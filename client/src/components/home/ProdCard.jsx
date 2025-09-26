// ProdCard.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import QuantityAdjustBtn from "../cart-management/QantityAdjustBtn";

export default function ProdCard({ item, actionFunc }) {
  const navigate = useNavigate();

  const { id, imageUrl, name, origin, price, quantity, unit } = item;

  return (
    <article
      className='product-card grow-with-ease'
      onClick={() => navigate(`items/${id}`)}
    >
      <div className='img-wrapper-sq'>
        <img className='img-fit-sq' src={imageUrl} alt={name} />
      </div>
      <div className='info'>
        <hgroup>
          <h2>{name}</h2>
          <p>Product of {origin}</p>
        </hgroup>
        <div className='price'>
          <span>${(price / 100).toFixed(2)} </span>
          <span>/ {unit}</span>
        </div>
      </div>
      <div
        className='cart-mgmt'
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {quantity > 0 && (
          <>
            <QuantityAdjustBtn
              action='decrement'
              content={
                quantity === 1 ? (
                  <img src='/images/trash-red.svg' alt='decrement amount by one' />
                ) : (
                  <img src='/images/down-red.svg' alt='decrement amount by one' />
                )
              }
              actionFunc={(e) => actionFunc(e, id, -1)}
            />
            <span className='item-count'>{quantity}</span>
          </>
        )}
        <QuantityAdjustBtn
          action={quantity ? "increment" : "add"}
          content={
            quantity ? (
              <img src='/images/up-red.svg' alt='decrement amount by one' />
            ) : (
              "Add to cart"
            )
          }
          actionFunc={(e) => actionFunc(e, id, 1)}
        />
      </div>
    </article>
  );
}
