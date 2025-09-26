// CartRow.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import AcctField from "../../components/info-page/AcctField";
import QuantityAdjustBtn from "../cart-management/QantityAdjustBtn";

export default function CartRow({ cartItem, toggleCart, actionFunc }) {
  const navigate = useNavigate();

  if (!cartItem || !cartItem?.item) <p>Loading item…</p>;

  const { itemId, item, quantity } = cartItem;
  const { name, imageUrl, price } = item;

  const rowTotal = price * quantity;

  const toProductPg = () => navigate(`../items/${itemId}`);

  return (
    <div className={`cart-row items ${toggleCart}`} onClick={toProductPg}>
      <div className='product'>
        <span className='img-wrapper-sq'>
          <img src={imageUrl} alt={name} className='img-fit-sq' />
        </span>
        <span className='name'>{name}</span>
      </div>
      <AcctField className='price money' fieldAmt={price} />
      <div className='cart-mgmt-qty'>
        <QuantityAdjustBtn
          action='increment'
          content={<img src='images/up-red.svg' alt='remove all' />}
          actionFunc={(e) => actionFunc(e, itemId, 1)}
        />
        <div className='qty'>
          <p>{quantity}</p>
        </div>
        <QuantityAdjustBtn
          action='decrement'
          content={<img src='images/down-red.svg' alt='remove all' />}
          actionFunc={(e) => actionFunc(e, itemId, -1)}
        />
      </div>
      <AcctField className='row-total money' fieldAmt={rowTotal} />
      <div className='cart-mgmt-dump'>
        <QuantityAdjustBtn
          action='dump'
          content={<img src='images/trash-red.svg' alt='remove all' />}
          actionFunc={(e) => actionFunc(e, itemId)}
        />
      </div>
    </div>
  );
}
