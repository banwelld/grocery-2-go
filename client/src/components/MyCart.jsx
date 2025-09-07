// MyCart.jsx

import React, { useContext } from "react";
import { OpenOrderContext } from "../contexts";
import useDocumentTitle from "./useDocumentTitle";
import StandardPg from "./info-page/PageTemplate";
import Heading from "./info-page/Heading";
import CartRow from "./info-page/CartRow";
import "../css/info-page.css";

export default function MyCart() {
  useDocumentTitle("My Cart");

  const { openOrder, itemCount, orderTotal } = useContext(OpenOrderContext);
  const items = openOrder?.order_items ?? [];
  const sortedItems = [...items].sort((a, b) => a.item.name.localeCompare(b.item.name));

  const sidebar = <Heading text='Options' isPgHead={false} />;

  const main = (
    <section className='my-cart info-page'>
      <Heading text='My Cart' />
      <div className='cart-grid'>
        <div className='cart-row labels'>
          <div className='product'>Item Info</div>
          <div className='qty'>Qty</div>
          <div className='price'>Price</div>
          <div className='row-total'>Row Total</div>
        </div>
        {sortedItems.map((oi) => (
          <CartRow orderItem={oi} />
        ))}
        <div className='cart-row totals'>
          <div className='product'>Order Total:</div>
          <div className='qty'>{itemCount}</div>
          <div className='price money'></div>
          <div className='row-total money'>
            <span>$</span>
            <span>{(orderTotal / 100).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </section>
  );

  return <StandardPg mainContent={main} sidebarContent={sidebar} />;
}
