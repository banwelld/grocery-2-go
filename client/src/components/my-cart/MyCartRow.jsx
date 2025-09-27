// CartRow.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import AcctField from "../../components/info-page/AcctField";
import QuantityAdjustBtn from "../cart-management/QantityAdjustBtn";

export default function CartRow({ cartItem, toggleCartClass, cartMgmtFunc }) {
  const navigate = useNavigate();

  if (!cartItem || !cartItem?.item) <p>Loading item…</p>;

  const { itemId, quantity } = cartItem;
  const { name, imageUrl, price } = cartItem.item;

  const rowTotal = price * quantity;

  const toProductPg = () => navigate(`../items/${itemId}`);
  const adjQuantity = (e) => cartMgmtFunc(e, itemId);

  return (
    <div className={`cart-row items ${toggleCartClass}`} onClick={toProductPg}>
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
          cartMgmtFunc={adjQuantity}
        />
        <div className='qty'>
          <p>{quantity}</p>
        </div>
        <QuantityAdjustBtn
          action='decrement'
          content={<img src='images/down-red.svg' alt='remove all' />}
          cartMgmtFunc={adjQuantity}
        />
      </div>
      <AcctField className='row-total money' fieldAmt={rowTotal} />
      <div className='cart-mgmt-dump'>
        <QuantityAdjustBtn
          action='dump'
          content={<img src='images/trash-red.svg' alt='remove all' />}
          cartMgmtFunc={adjQuantity}
        />
      </div>
    </div>
  );
}
