// useBasket.js

import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { OrderContext, ProductContext } from "../contexts/contexts";
import { patchData } from "../helpers/helpers";

export default function useBasket() {
  const { basket, setBasket, triggerOrderSubmit } = useContext(OrderContext);
  const { products } = useContext(ProductContext);
  const navigate = useNavigate();

  const orderProducts = useMemo(
    () => basket?.orderProducts ?? [],
    [basket?.orderProducts]
  );

  const orderId = basket?.id ?? 0;

  const noBasket = !orderId;
  const basketEmpty = orderProducts.length === 0;
  const notOpenOrder = basket?.status !== "open";

  // basket summary

  const basketSummary = useMemo(() => {
    let basketTotal = 0;
    let basketQuantity = 0;

    for (const op of orderProducts) {
      const product = products.find((p) => p.id === op.productId);
      if (!product) continue;
      basketTotal += product.price * op.quantity;
      basketQuantity += op.quantity;
    }

    return { basketTotal, basketQuantity };
  }, [orderProducts, products]);

  // response handler

  const orderPagePath = `/orders/${orderId}`;

  const onCheckout = (orderId) => {
    setBasket(null);
    navigate(orderPagePath);
  };

  // checkout function

  const onCheckoutClick = (submissionData) => {
    if (notOpenOrder)
      return console.log(
        "Attempted basket action on order with status other than 'open'."
      );

    if (noBasket || basketEmpty) return;

    const submitOrder = () =>
      patchData(
        `orders/${orderId}?action_type=checkout`,
        { ...submissionData, status: "submitted" },
        (orderId) => onCheckout(orderId)
      );
    return triggerOrderSubmit(submitOrder);
  };

  return {
    orderId,
    ...basketSummary,
    onCheckoutClick,
    basketProducts: orderProducts,
    basket,
    setBasket,
    noBasket,
    basketEmpty,
  };
}
