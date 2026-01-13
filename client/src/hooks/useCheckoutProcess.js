// /client/src/pages/cart/CheckoutContext.jsx

import { useContext } from "react";
import { CheckoutProcessContext } from "../contexts/CheckoutProcessContext";

/**
 * @typedef {Object} UseCheckoutProcessReturn
 * @property {Object} cart - cart data { products, orderItemCount, orderTotal, cartLoaded }
 * @property {Object} checkout - checkout state { userConfirmed, setUserConfirmed, address, setAddress }
 * @property {Object} viewMode - view state { modeVariant, setCartMode, setCheckoutMode }
 */

/**
 * @returns {UseCheckoutProcessReturn}
 */
const useCheckoutProcess = () => useContext(CheckoutProcessContext);

export default useCheckoutProcess;