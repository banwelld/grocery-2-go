// /client/src/hooks/useBasket.js

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../contexts/contexts";
import { patchData, logException } from "../helpers/helpers";
import { errorMessages as msg } from "./constants";

export default function useBasket() {
  const { basket, setBasket } = useContext(OrderContext);
  const navigate = useNavigate();

  const orderId = basket?.id ?? 0;
  const products = basket?.orderProducts ?? [];

  const hasBasket = !!orderId && orderId >= 1;
  const hasItems = Array.isArray(products) && products.length >= 1;
  const isOpen = hasBasket && basket?.status === "open";

  const orderTotal = products?.reduce((total, curr) => {
    return total + curr?.product?.price * curr?.quantity;
  }, 0);

  const itemCount = products?.reduce((total, curr) => (total += curr?.quantity), 0);

  // checkout function

  const handleCheckout = (submissionData) => {
    if (!hasBasket || !hasItems) return logException(msg.EMPTY_BASKET);

    if (!isOpen) return logException(msg.ORDER_STATUS);

    patchData(`orders/${orderId}?action_type=checkout`, {
      ...submissionData,
      status: "submitted",
    })
      .then(() => {
        setBasket(null);
        navigate(`/orders/${orderId}`);
      })
      .catch((err) => console.error("Checkout failed: ", err));
  };

  return {
    orderId,
    itemCount,
    orderTotal,
    handleCheckout,
    products,
    basket,
    setBasket,
    hasBasket,
    hasItems,
    isOpen,
  };
}
