// MyCart.jsx

import React, { useContext, useState } from "react";
import { OrderContext } from "../../contexts";
import Heading from "../info-page/Heading";
import SplitPageWrapper from "../info-page/SplitPageWrapper";
import CartRow from "./CartRow";
import AcctField from "../info-page/AcctField";
import SubmitOrder from "./SubmitOrder";
import CartMgmtWrapper from "../cart-management/CartMgmtWrapper";
import { countOrderItems, sortBy, getOrderTotal } from "../../helpers";
import "../../css/my-cart.css";

export default function MyCart() {
  const { cartItems } = useContext(OrderContext);
  const [formVisible, setFormVisible] = useState(false);

  const toggleCart = formVisible ? "hidden" : "show";
  const toggleForm = formVisible ? "show" : "hidden";

  if (!cartItems) return <p>Loading...</p>;

  const itemCount = countOrderItems(cartItems) ?? 0;
  const orderTotal = getOrderTotal(cartItems);

  const sortedItems = sortBy(cartItems, (ci) => ci.item.name);

  const submitButtonText = !formVisible ? "Submit Order" : "View Cart";

  const cartRows = sortedItems.map((ci) => (
    <CartMgmtWrapper key={ci.itemId}>
      <CartRow toggleCart={toggleCart} cartItem={ci} />
    </CartMgmtWrapper>
  ));

  return (
    <SplitPageWrapper>
      {/* sidebar */}
      <aside className='my-cart'>
        <Heading text='Options' isPgHead={false} />
        <div className='cart-options'>
          <button
            type='button'
            className='cart-options-btn'
            onClick={() => setFormVisible(!formVisible)}
          >
            {submitButtonText}
          </button>
        </div>
      </aside>

      {/* main content */}
      <div className='my-cart'>
        <Heading text='My Cart' />
        {itemCount ? (
          <div className='cart-grid'>
            <div className={`cart-row labels ${toggleCart}`}>
              <div className='product'>Item Info</div>
              <div className='price'>Price</div>
              <div className='qty'>Qty</div>
              <div className='row-total'>Row Total</div>
            </div>
            {cartRows}
            <div className='cart-row totals'>
              <div className='product'>Order Total:</div>
              <div className='price money'></div>
              <div className='qty'>{`${itemCount} item${
                itemCount === 1 ? "" : "s"
              }`}</div>
              <AcctField className='row-total money' fieldAmt={orderTotal} />
            </div>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
        <CartMgmtWrapper injectUserData={true}>
          <SubmitOrder toggleForm={toggleForm} orderTotal={orderTotal} />
        </CartMgmtWrapper>
      </div>
    </SplitPageWrapper>
  );
}
