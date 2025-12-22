// /client/src/hooks/useQuantityAdjust.js

import { useRef } from "react";
import useBasket from "../useBasket";
import { postData, patchData, isInteger, logException } from "../../helpers/helpers";
import { quantityAction as qa, errorMessages as msg } from "../constants";

export default function useQuantityAdjust(productId) {
  const isPending = useRef(false);

  const { setBasket, products, hasBasket, isOpen, orderId } = useBasket();

  const orderProduct = products?.find((p) => p.productId === productId);
  const rowId = orderProduct?.id;
  const productCount = orderProduct?.quantity ?? 0;

  const hasOrderProduct = isInteger(rowId) && rowId >= 1;
  const hasProduct = productCount >= 1;
  const isLast = productCount === 1;

  // state updaters

  const onAddOrder = (data, count = 1) => {
    setBasket(data);
    return productId ? addOrderProduct(count) : Promise.resolve();
  };

  const onAddProduct = (data) => {
    const { id, orderId, productId, product, quantity } = data;
    setBasket((prev) => ({
      ...prev,
      orderProducts: [
        ...(prev.orderProducts ?? []),
        { id, orderId, productId, product, quantity },
      ],
    }));
  };

  const onAdjustQuantity = (rowId, count) => {
    setBasket((prev) => ({
      ...prev,
      orderProducts:
        prev.orderProducts?.map((p) =>
          p.id === rowId ? { ...p, quantity: count } : p
        ) ?? [],
    }));
  };

  const onDumpProduct = (rowId) => {
    setBasket((prev) => ({
      ...prev,
      orderProducts: prev.orderProducts?.filter((p) => p.id !== rowId) ?? [],
    }));
  };

  // database interactions

  const addNewOrder = (count = 1) =>
    postData("/orders", {})
      .then((data) => onAddOrder(data, count))
      .catch((err) => logException(msg.CREATE_NEW_BASKET, err));

  const addOrderProduct = (count = 1) =>
    postData("/order_products", {
      order_id: orderId,
      product_id: productId,
      quantity: count,
    })
      .then((data) => onAddProduct(data))
      .catch((err) => logException(msg.ADD_FIRST_OF_TYPE, err));

  const adjustQuantity = (value) => {
    if (!isInteger(value) || value === 0) return logException(msg.ADJUST_VALUE);

    const newCount = productCount + value;

    if (newCount < 0) return logException(msg.NEGATIVE_QUANTITY);

    if (isPending.current) return;
    isPending.current = true;

    onAdjustQuantity(rowId, newCount);

    const errorMessage = value > 0 ? msg.INCREMENT : msg.DECREMENT;

    patchData(`/order_products/${rowId}`, {
      quantity: newCount,
    })
      .then((data) => {
        if (data.status === "deleted") return onDumpProduct(data.id);
        onAdjustQuantity(data.id, data.quantity);
      })
      .catch((err) => {
        logException(errorMessage, err);
        onAdjustQuantity(rowId, productCount);
      })
      .finally(() => (isPending.current = false));
  };

  // quantity action functions

  const handleAdd = (count = 1) => {
    return adjustQuantity(count);
  };

  const handleAddFirst = (count = 1) => {
    if (!hasBasket) return addNewOrder(count);
    return addOrderProduct(count);
  };

  const handleRemoveQuantity = (count = 1) => {
    if (!hasBasket || !hasProduct) return logException(msg.EMPTY_BASKET);
    return adjustQuantity(-count);
  };

  const handleQuantityAdjust = (e, { action } = {}) => {
    e.stopPropagation();
    if (!action) return logException(msg.QUANTITY_ACTION);
    if (!isOpen) return logException(msg.ORDER_STATUS);
    if (!hasOrderProduct && action !== qa.ADD_NEW) return logException(msg.NO_PRODUCT);

    switch (action) {
      case qa.ADD:
        handleAdd();
        break;

      case qa.ADD_NEW:
        handleAddFirst();
        break;

      case qa.REMOVE:
        handleRemoveQuantity();
        break;

      case qa.REMOVE_ALL:
        handleRemoveQuantity(productCount);
        break;

      default:
        console.warn("Unrecognized basket action: ", action);
    }
  };

  return {
    handleQuantityAdjust,
    itemCount: productCount,
    isLast,
    hasProduct,
  };
}
