import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { isInteger } from "../helpers/helpers";
import { errorMessages as msg } from "./constants";

export default function useCartAction(productId) {
  const { products, cartActionsCtx } = useContext(CartContext);
  const { addToCart, takeFromCart, resetProduct } = cartActionsCtx;

  const product = products?.find((p) => p.productId === productId);
  const quantity = product?.quantity;

  const isValid = (orderProduct, delta) => {
    const errors = [];

    if (!orderProduct) errors.push(msg.NO_PRODUCT);
    if (!isInteger({ value: delta }) || delta === 0) errors.push(msg.ADJUST_VALUE);

    if (errors.length > 0) {
      console.warn("Quantity adjustment failed: ", errors);
      return false;
    }

    return true;
  };

  const hasProduct = !!product && product.quantity >= 1;

  const increment = (count = 1) => {
    if (typeof count !== "number") count = 1;
    if (product && !isValid(product, count)) return;
    addToCart(productId, count);
  };

  const decrement = (count = 1) => {
    if (typeof count !== "number") count = 1;
    if (!isValid(product, -count)) return;
    takeFromCart(productId, count);
  };

  const resetQuantity = () => {
    if (!product) return;
    resetProduct(productId);
  };

  return { quantity, increment, decrement, resetQuantity, hasProduct };
}
