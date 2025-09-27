// CartMgmtWrapper.jsx

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OrderContext, UserContext } from "../../contexts";
import { postData, patchData } from "../../helpers";

export default function CartMgmtWrapper({ children }) {
  const { user } = useContext(UserContext);
  const { cartOrder, setCartOrder, setCartItems, cartItems } = useContext(OrderContext);
  const navigate = useNavigate();

  if (!user) return;

  const addCartItem = (cartItemId, orderId, itemId, item, quantity) => {
    setCartItems((cart) => [
      ...cart,
      {
        id: cartItemId,
        orderId: orderId,
        itemId: itemId,
        item: item,
        quantity: quantity,
      },
    ]);
  };

  const replCartItemQty = (itemId, quantity) => {
    setCartItems((cart) =>
      cart.map((ci) =>
        ci.itemId === Number(itemId) ? { ...ci, quantity: quantity } : ci
      )
    );
  };

  const delOpenOrderItem = (cartItemId) => {
    setCartItems((cart) => cart.filter((oi) => oi.id !== cartItemId));
  };

  const onCreateOrder = (data, itemId = null, adjustment = 0) => {
    console.log(data);
    setCartOrder(data);
    if (itemId)
      postData(
        "/order_items",
        { order_id: data.id, item_id: itemId, quantity: adjustment },
        onCreateOrderItem
      );
  };

  const onCreateOrderItem = (data) => {
    addCartItem(data.id, data.orderId, data.itemId, data.item, data.quantity);
  };

  const onAdjOrderItemQty = (data) => {
    replCartItemQty(data.itemId, data.quantity);
  };

  const onCheckout = () => {
    setCartOrder({});
    setCartItems([]);
    navigate("/");
  };

  const delOrderItem = (cartItemId) => {
    fetch(`/order_items/${cartItemId}`, {
      method: "DELETE",
    })
      .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (ok) {
          delOpenOrderItem(cartItemId);
        } else {
          alert(`Error (delete order item): ${data.error}`);
        }
      });
  };

  const handleClick = (e, itemId, adjustment = 0, submissionData = []) => {
    const clickAction = e.currentTarget.dataset.action;
    const targetItem = cartItems?.find((i) => i.itemId === itemId) ?? {};
    const orderId = cartOrder?.id ?? 0;
    const userId = user.id;

    if (!user) return navigate("/login");

    switch (clickAction) {
      case "increment":
      case "add":
        return handleIncrement(userId, orderId, itemId, targetItem, adjustment);
      case "decrement":
        return handleDecrement(orderId, targetItem, adjustment);
      case "dump":
        return handleDump(orderId, targetItem);
      case "checkout":
        return handleCheckout(orderId, cartItems, submissionData);
      default:
        return;
    }
  };

  const handleIncrement = (userId, orderId, itemId, targetItem, adjustment = 1) => {
    if (!orderId)
      return postData("/orders", { user_id: userId }, onCreateOrder, itemId, adjustment);

    if (!cartItems.find((i) => i.itemId === itemId))
      return postData(
        "/order_items",
        { order_id: orderId, item_id: itemId, quantity: adjustment },
        onCreateOrderItem
      );

    return patchData(
      `/order_items/${targetItem.id}`,
      { quantity: targetItem.quantity + adjustment },
      onAdjOrderItemQty
    );
  };

  const handleDecrement = (orderId, cartItem, adjustment = -1) => {
    if (!orderId || !cartItem || cartItem.quantity < 1) return;
    if (cartItem.quantity === 1) return delOrderItem(cartItem.id);

    return patchData(
      `/order_items/${cartItem.id}`,
      { quantity: cartItem.quantity + adjustment },
      onAdjOrderItemQty
    );
  };

  const handleDump = (orderId, cartItem) => {
    if (!orderId || !cartItem || cartItem.quantity < 1) return;
    return delOrderItem(cartItem.id);
  };

  const handleCheckout = (orderId, itemList, submissionData) => {
    if (!itemList.length || !orderId) return;
    return patchData(
      `orders/${orderId}?action=checkout`,
      { ...submissionData, status: "submitted" },
      onCheckout
    );
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { cartMgmtFunc: handleClick });
        }
        return child;
      })}
    </>
  );
}
