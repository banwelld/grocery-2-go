import useCart from './useCart';
import { isInteger, logException } from '../utils/helpers';
import Feedback from '../config/feedback';

const { Errors } = Feedback;

export default function useCartAction(productId) {
  const {
    cartDetails: { products },
    cartActions: { addToCart, takeFromCart, resetProduct },
  } = useCart();

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

    return addToCart({ productId, count: amount });
  };

  const decrement = (count = 1) => {
    const amount = typeof count === 'number' ? count : 1;

    if (!isInteger({ value: amount }) || amount <= 0)
      return logException(
        Errors.INVALID.DATA('positive, non-zero integer', amount),
        null,
      );

    return takeFromCart({ productId, count: amount });
  };

  const resetQuantity = () => {
    if (!product) return;
    return resetProduct({ productId });
  };

  return { quantity, increment, decrement, resetQuantity, hasProduct };
}
