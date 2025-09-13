// MyCart.jsx

import React, { useEffect, useContext } from "react";
import { OrderContext } from "../contexts";
import Heading from "./info-page/Heading";
import SplitPage from "./templates/SplitPage";
import CartRow from "./info-page/CartRow";
import AcctField from "./info-page/AcctField";
import { countOrderItems, getOrderTotal } from "../helpers";
import "../css/info-page.css";

export default function MyCart() {
  const { openOrder, getCartItems, cartItems } = useContext(OrderContext);

  useEffect(() => {
    getCartItems(openOrder.id);
  }, [openOrder]);

  const sortedItems = [...cartItems].sort((a, b) =>
    a.item.name.localeCompare(b.item.name)
  );

  const itemCount = countOrderItems(cartItems);
  const orderTotal = getOrderTotal(cartItems);

  const sidebar = <Heading text='Options' isPgHead={false} />;

  return (
    <SplitPage sidebar={sidebar}>
      <div className='my-cart'>
        <Heading text='My Cart' />
        {itemCount ? (
          <div className='cart-grid'>
            <div className='cart-row labels'>
              <div className='product'>Item Info</div>
              <div className='price'>Price</div>
              <div className='qty'>Qty</div>
              <div className='row-total'>Row Total</div>
            </div>
            {sortedItems.map((oi) => (
              <CartRow orderItem={oi} key={oi.item_id} />
            ))}
            <div className='cart-row totals'>
              <div className='product'>Order Total:</div>
              <div className='price money'></div>
              <div className='qty'>{itemCount}</div>
              <AcctField className='row-total money' fieldAmt={orderTotal} />
            </div>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </SplitPage>
  );
}
