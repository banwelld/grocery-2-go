// /client/src/hooks/useCart.js

import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { errorMessages as msg } from "./constants";

/**
 * @typedef {Object} UseCartReturn
 * @property {Object} cart - current cart object
 * @property {Array} products - array of products in the cart
 * @property {function(Object): Promise<void>} checkout - submit the cart for checkout
 * @property {function(): void} loadCart - load the cart from the server
 * @property {function(): void} resetCart - clear the cart state
 * @property {number} orderTotal - total cost of the cart
 * @property {number} orderItemCount - count of items in the cart
 * @property {boolean} isPending - network request is currently pending
 * @property {boolean} cartLoaded - whether the initial cart load has completed
 */

/**
 * @returns {UseCartReturn}
 */
export default function useCart() {
  const { cartCtx, products } = useContext(CartContext);
  const { cart, checkout, ...rest } = cartCtx;

  const isValidCheckout = () => {
    if (!cart || products.length === 0) {
      console.warn(msg.EMPTY_CART);
      return false;
    }
    return true;
  };

  const validatedCheckout = (data) => checkout(data, isValidCheckout);

  return { cart, products, checkout: validatedCheckout, ...rest };
}
