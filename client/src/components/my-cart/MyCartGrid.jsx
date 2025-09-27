// MyCartGrid.jsx

import React, { useContext } from "react";
import { OrderContext } from "../../contexts";
import Heading from "../info-page/Heading";
import MyCartRow from "./MyCartRow";
import AcctField from "../info-page/AcctField";
import { countOrderItems, sortBy, getOrderTotal } from "../../helpers";

export default function MyCatGrid({ formVisible, cartMgmtFunc }) {
  const { cartItems } = useContext(OrderContext);

  const toggleCartClass = formVisible ? "hidden" : "show";

  if (!cartItems) return <p>Loading...</p>;

  const itemCount = countOrderItems(cartItems) ?? 0;
  const orderTotal = getOrderTotal(cartItems);

  const sortedItems = sortBy(cartItems, (ci) => ci.item.name);
  const cartRows = sortedItems.map((ci) => (
    <MyCartRow
      key={ci.itemId}
      toggleCartClass={toggleCartClass}
      cartItem={ci}
      cartMgmtFunc={cartMgmtFunc}
    />
  ));

  return (
    <section className='my-cart-info'>
      <Heading text='My Cart' />
      {itemCount ? (
        <div className='cart-grid'>
          <div className={`cart-row labels ${toggleCartClass}`}>
            <div className='product'>Item Info</div>
            <div className='price'>Price</div>
            <div className='qty'>Qty</div>
            <div className='row-total'>Row Total</div>
          </div>
          {cartRows}
          <div className='cart-row totals'>
            <div className='product'>Order Total:</div>
            <div className='price money'></div>
            <div className='qty'>{`${itemCount} item(s)`}</div>
            <AcctField className='row-total money' fieldAmt={orderTotal} />
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </section>
  );
}
