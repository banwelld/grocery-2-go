import { useContext } from 'react';
import { CartContext } from '../features/cart/context/CartContext';

/**
 * @typedef {Object} UseCartReturn
 * @property {Object} cart - current cart object
 * @property {Object} cartStatus - status flags and base loaders
 * @property {function(): void} cartStatus.loadLocalCart - load the cart from the server
 * @property {function(): void} cartStatus.resetLocalCart - clear the cart state
 * @property {boolean} cartStatus.isPending - network request is currently pending
 * @property {boolean} cartStatus.cartLoaded - whether the initial cart load has completed
 * @property {boolean} cartStatus.cartEmpty - whether the cart exists but has no items
 * @property {Object} cartDetails - computed cart data
 * @property {Array} cartDetails.products - array of products in the cart
 * @property {number} cartDetails.orderTotal - total cost of the cart
 * @property {number} cartDetails.orderItemCount - total item count in the cart
 * @property {Object} cartActions - cart mutation functions
 * @property {function(Object): void} cartActions.addToCart - add a product to the cart
 * @property {function(Object): void} cartActions.takeFromCart - remove one of a product
 * @property {function(Object): void} cartActions.resetProduct - remove all of a product
 * @property {function(): void} cartActions.deleteCart - optimistically deletes the existing cart order
 * @property {function(Object): Promise<void>} cartActions.checkout - submit the cart
 */

/**
 * @returns {UseCartReturn}
 */

const useCart = () => useContext(CartContext);

export default useCart;
