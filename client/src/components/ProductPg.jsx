// ProductPg.jsx

import React from "react";
import { useParams, useOutletContext } from "react-router-dom";
import CartMgmtWrapper from "./cart-management/CartMgmtWrapper";
import QuantityAdjustBtn from "./cart-management/QantityAdjustBtn";
import SplitPageWrapper from "./info-page/SplitPageWrapper";
import Heading from "./info-page/Heading";
import "../css/product-page.css";

export default function ProductPg() {
  return (
    <CartMgmtWrapper>
      <ProductPageDisplay />
    </CartMgmtWrapper>
  );
}

function ProductPageDisplay({ actionFunc }) {
  const { id } = useParams();
  const { items } = useOutletContext();

  if (!items.length) return <p>Loading...</p>;

  const item = items.find((i) => i.id === Number(id));
  if (!item) return <p>Item not found.</p>;

  const { description, imageUrl, name, origin, pkgQty, price, quantity, unit } = item;
  const formattedPrice = (price / 100).toFixed(2);

  return (
    <SplitPageWrapper>
      {/* sidebar */}
      <aside className='product-page'>
        <Heading text='In Your Cart' isPgHead={false} subText={name} />
        <div className='cart-mgmt'>
          <div className='item-count'>
            <p>{quantity}</p>
          </div>
          <div className='buttons'>
            <QuantityAdjustBtn
              action='increment'
              content='+'
              actionFunc={(e) => actionFunc(e, Number(id), 1)}
            />
            <QuantityAdjustBtn
              action='dump'
              content={<img src='/images/trash-white.svg' alt='remove all' />}
              actionFunc={(e) => actionFunc(e, Number(id))}
            />
            <QuantityAdjustBtn
              action='decrement'
              content='-'
              actionFunc={(e) => actionFunc(e, Number(id), -1)}
            />
          </div>
        </div>
      </aside>

      {/* main content */}
      <article className='product-info'>
        <div className='img-wrapper-sq'>
          <img className='img-fit-sq' src={imageUrl} alt={name} />
        </div>
        <div className='text'>
          <Heading text={name} subText={`Product of ${origin}`} />
          <p className='desc'>{description}</p>
          <p className='pricing'>
            <span className='price'>${formattedPrice} </span>
            <span className='pkg-desc'>/ {unit} </span>
            {pkgQty && <span className='pkg-qty'>({pkgQty})</span>}
          </p>
        </div>
      </article>
    </SplitPageWrapper>
  );
}
