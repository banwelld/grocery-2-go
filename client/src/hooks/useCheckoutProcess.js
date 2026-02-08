import { useContext } from 'react';
import { CheckoutProcessContext } from '../features/cart/context/CheckoutProcessContext';

/**
 * @typedef {Object} UseCheckoutProcessReturn
 * @property {Object} cart
 * @property {Array} cart.products
 * @property {number} cart.id
 * @property {number} cart.orderItemCount
 * @property {number} cart.orderTotal
 * @property {boolean} cart.cartLoaded
 * @property {Object} checkoutProcess
 * @property {function(Object): void} checkoutProcess.checkout
 * @property {function(Object): void} checkoutProcess.resetSession
 * @property {boolean} checkoutProcess.userConfirmed
 * @property {function(boolean): void} checkoutProcess.setUserConfirmed
 * @property {Object} checkoutProcess.address
 * @property {function(Object): void} checkoutProcess.setAddress
 * @property {Object} user
 * @property {Object} user.user
 * @property {boolean} user.isLoggedIn
 * @property {Object} viewMode
 * @property {string} viewMode.currentViewMode
 * @property {function(): void} viewMode.toggleViewMode
 */

/**
 * @returns {UseCheckoutProcessReturn}
 */
const useCheckoutProcess = () => useContext(CheckoutProcessContext);

export default useCheckoutProcess;
