import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Feedback from '../config/feedback';
import PATHS from '../config/paths';
import {
  selectCartData,
  selectIsPending,
  selectCartLoaded,
  selectOrderTotal,
  selectOrderItemCount,
  resetLocalCart,
} from '../features/cart/redux/cartSlice';
import {
  loadLocalCartThunk,
  addToCartThunk,
  takeFromCartThunk,
  resetProductThunk,
  deleteCartThunk,
  checkoutThunk,
} from '../features/cart/redux/cartThunks';

const { Toasts } = Feedback;

const useCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector(selectCartData);
  const isPending = useSelector(selectIsPending);
  const cartLoaded = useSelector(selectCartLoaded);
  const orderTotal = useSelector(selectOrderTotal);
  const orderItemCount = useSelector(selectOrderItemCount);

  const products = cart?.orderProducts ?? [];
  const cartEmpty = products.length === 0;

  const loadLocalCart = () => dispatch(loadLocalCartThunk());
  const handleResetLocalCart = () => dispatch(resetLocalCart());
  const addToCart = async (payload) => {
    try {
      await toast.promise(dispatch(addToCartThunk(payload)).unwrap(), {
        loading: Toasts.ORDER_PRODUCT.CREATE.BUSY,
        error: (err) => {
          if (err.status === 401) {
            navigate(PATHS.FRONT.AUTH_LOGIN);
            return Toasts.ORDER.CREATE.GUEST;
          }
          if (err.status === 403) {
            return Toasts.ORDER.CREATE.ADMIN;
          }
          return err.status || Toasts.ORDER_PRODUCT.CREATE.FAILURE;
        },
      });
    } catch (err) {}
  };
  const takeFromCart = (payload) => dispatch(takeFromCartThunk(payload));
  const resetProduct = (payload) => dispatch(resetProductThunk(payload));
  const deleteCart = () => dispatch(deleteCartThunk());

  const checkout = async (payload) => {
    try {
      const result = await dispatch(checkoutThunk(payload)).unwrap();
      navigate(PATHS.FRONT.ORDER, {
        replace: true,
        state: { order: result.clientOrder },
      });
    } catch (err) {}
  };

  return {
    cart,
    cartStatus: {
      loadLocalCart,
      resetLocalCart: handleResetLocalCart,
      isPending,
      cartLoaded,
      cartEmpty,
    },
    cartDetails: {
      products,
      orderTotal,
      orderItemCount,
    },
    cartActions: {
      addToCart,
      takeFromCart,
      resetProduct,
      deleteCart,
      checkout,
    },
  };
};

export default useCart;
