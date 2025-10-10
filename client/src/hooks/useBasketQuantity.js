// useBasketQuantity.js

import useBasket from "./useBasket";
import { postData, patchData, deleteData } from "../helpers/helpers";

export default function useBasketQuantity(targetProductId) {
  const {
    basket,
    setBasket,
    basketProducts: orderProducts,
    noBasket,
    orderId,
  } = useBasket(targetProductId);

  const targetProduct = orderProducts?.find((bp) => bp.productId === targetProductId);
  const orderProductId = targetProduct?.id;
  const productQuantity = targetProduct?.quantity ?? 0;

  const lastOfType = productQuantity === 1;
  const noneOfType = !targetProduct || productQuantity < 1;
  const notOpenOrder = basket?.status !== "open";

  // state updaters

  const addOrderProduct = (orderProductId, orderId, productId, product, quantity) => {
    setBasket((prev) => ({
      ...prev,
      orderProducts: [
        ...(prev.orderProducts ?? []),
        {
          id: orderProductId,
          orderId,
          productId,
          product,
          quantity,
        },
      ],
    }));
  };

  const adjOrderProductQty = (productId, quantity) => {
    setBasket((prev) => ({
      ...prev,
      orderProducts:
        prev.orderProducts?.map((op) =>
          op.productId === Number(productId) ? { ...op, quantity } : op
        ) ?? [],
    }));
  };

  const dumpOrderProduct = (orderProductId) => {
    setBasket((prev) => ({
      ...prev,
      orderProducts: prev.orderProducts?.filter((bp) => bp.id !== orderProductId) ?? [],
    }));
  };

  // response handlers

  const onCreateOrderProduct = (data) => {
    addOrderProduct(data.id, data.orderId, data.productId, data.product, data.quantity);
  };

  const onAdjOrderProductQty = (data) => {
    adjOrderProductQty(data.productId, data.quantity);
  };

  const onCreateOrder = (data, productId = null, adjustment = 0) => {
    setBasket(data);
    if (productId)
      postData(
        "/order_products",
        { order_id: data.id, product_id: productId, quantity: adjustment },
        onCreateOrderProduct
      );
  };

  // dump handler

  const delOrderProduct = (orderProductId) => {
    deleteData(`/order_products/${orderProductId}`, () =>
      dumpOrderProduct(orderProductId)
    );
  };

  // basket action functions

  const onAddClick = (e) => {
    e.stopPropagation();
    if (notOpenOrder)
      return console.log(
        "Attempted basket action on order with status other than 'open'."
      );

    if (noBasket) return postData("/orders", {}, onCreateOrder, targetProductId, 1);

    if (noneOfType)
      return postData(
        "/order_products",
        { order_id: orderId, product_id: targetProductId, quantity: 1 },
        onCreateOrderProduct
      );

    return patchData(
      `/order_products/${orderProductId}`,
      { quantity: productQuantity + 1 },
      onAdjOrderProductQty
    );
  };

  const onRemoveClick = (e, { removeAll = lastOfType } = {}) => {
    e.stopPropagation();
    if (notOpenOrder)
      return console.log(
        "Attempted basket action on order with status other than 'open'."
      );

    if (noBasket || noneOfType) return;

    if (removeAll) return delOrderProduct(orderProductId);

    return patchData(
      `/order_products/${orderProductId}`,
      { quantity: productQuantity - 1 },
      onAdjOrderProductQty
    );
  };

  return {
    onAddClick,
    onRemoveClick,
    productQuantity,
    lastOfType,
    noneOfType,
  };
}
