import { useContext } from 'react';
import { CartContext } from '../features/cart/context/CartContext';
import { isInteger, logException } from '../utils/helpers';
import Feedback from '../config/feedback';

const { Errors } = Feedback;

export default function useCartAction(productId) {
  const {
    cartDetails: { products },
    cartActions: { addToCart, takeFromCart, resetProduct },
  } = useContext(CartContext);

  const product = products?.find((p) => p.productId === productId);
  const quantity = product?.quantity || 0;
  const hasProduct = !!product && quantity >= 1;

  const increment = (count = 1) => {
    const amount = typeof count === 'number' ? count : 1;

    if (!isInteger({ value: amount }) || amount <= 0)
      return logException(
        Errors.INVALID.DATA('positive, non-zero integer', amount),
        null,
      );

    return addToCart(productId, amount);
  };

  const decrement = (count = 1) => {
    const amount = typeof count === 'number' ? count : 1;

    if (!isInteger({ value: amount }) || amount <= 0)
      return logException(
        Errors.INVALID.DATA('positive, non-zero integer', amount),
        null,
      );

    return takeFromCart(productId, amount);
  };

  const resetQuantity = () => {
    if (!product) return;
    return resetProduct(productId);
  };

  return { quantity, increment, decrement, resetQuantity, hasProduct };
}
