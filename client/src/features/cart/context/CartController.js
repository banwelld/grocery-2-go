import toast from 'react-hot-toast';

import {
  getData,
  postData,
  patchData,
  deleteData,
  runExclusive,
  logException,
} from '../../../utils/helpers';
import { toClient, toServer } from '../../../utils/serializer';
import Feedback from '../../../config/feedback';
import PATHS from '../../../config/paths';

const { Toasts, Errors } = Feedback;

export function createCartController({
  setCart,
  setCartLoaded,
  navigate,
  concurrencyControls,
  cartRef,
}) {
  const handleCartData = (data) => {
    if (!Array.isArray(data))
      return logException(Errors.INVALID.DATA('array', typeof data), data);

    const openOrder = data.find((order) => order.status === 'open');
    if (!!openOrder) setCart(openOrder);
  };

  // fetch cart (currently auth'd user's orders with status 'open') from server
  const loadLocalCart = () =>
    runExclusive({
      doFetch: () =>
        getData(`${PATHS.BACK.ORDERS}?status=open&action_type=cart_load`)
          .then((data) => handleCartData(toClient(data, 'order')))
          .catch((err) => {
            logException(Errors.FAILURE.RECEIVE, err);
            throw err;
          }),
      setIsLoaded: setCartLoaded,
      ...concurrencyControls,
    });

  const findOrderProduct = (productId) =>
    cartRef.current?.orderProducts?.find(
      (product) => product.productId === productId,
    ) ?? null;

  // state managers

  const addUiProduct = (data) => {
    const { id, orderId, productId, product, quantity } = data;
    setCart((prev) => ({
      ...prev,
      orderProducts: [
        ...(prev.orderProducts ?? []),
        { id, orderId, productId, product, quantity },
      ],
    }));
  };

  const adjustUiQuantity = (rowId, newCount) => {
    setCart((prev) => ({
      ...prev,
      orderProducts:
        prev.orderProducts?.map((product) =>
          product.id === rowId ? { ...product, quantity: newCount } : product,
        ) ?? [],
    }));
  };

  const removeUiProduct = (rowId) => {
    setCart((prev) => ({
      ...prev,
      orderProducts:
        prev.orderProducts?.filter((product) => product.id !== rowId) ?? [],
    }));
  };

  const resetLocalCart = () => setCart(null);

  // database interactions

  const addOrder = () =>
    runExclusive({
      doFetch: () =>
        postData(PATHS.BACK.ORDERS, {})
          .then((data) => {
            const clientOrder = toClient(data, 'order');
            setCart(clientOrder);
            return clientOrder;
          })
          .catch((err) => {
            if (err.status !== 401) logException(Errors.FAILURE.CREATE, err);
            throw err;
          }),
      ...concurrencyControls,
    });

  const deleteOrder = () => {
    const currentCart = cartRef.current;
    if (!currentCart) return;

    resetLocalCart();

    return runExclusive({
      doFetch: () =>
        deleteData(PATHS.BACK.ORDER_ID(currentCart.id)).catch((err) => {
          logException(Errors.FAILURE.DELETE, err);
          setCart(currentCart);
          throw err;
        }),
      ...concurrencyControls,
    });
  };

  const addOrderProduct = (orderId, productId, count = 1) =>
    runExclusive({
      doFetch: () =>
        postData(
          PATHS.BACK.ORDER_PRODUCTS,
          toServer({ orderId, productId, quantity: count }, 'order_product'),
        )
          .then((data) => addUiProduct(toClient(data, 'order_product')))
          .catch((err) => {
            if (err.status !== 401) logException(Errors.FAILURE.CREATE, err);
            throw err;
          }),
      ...concurrencyControls,
    });

  const removeOrderProduct = (orderProduct) => {
    const { id } = orderProduct;

    return runExclusive({
      doFetch: () =>
        deleteData(PATHS.BACK.ORDER_PRODUCT_ID(id))
          .then(() => removeUiProduct(id))
          .catch((err) => logException(Errors.FAILURE.DELETE, err)),
      ...concurrencyControls,
    });
  };

  const adjustQuantity = ({ orderProduct, delta, shouldRemove = false }) => {
    const { id: orderProductId, quantity } = orderProduct;
    const newQuantity = quantity + delta;
    // remove from orderProducts if quantity goes to 0 (or less, in case of error)
    if (newQuantity <= 0 || shouldRemove)
      return removeOrderProduct(orderProduct);

    return runExclusive({
      doFetch: () => {
        adjustUiQuantity(orderProductId, newQuantity);

        return patchData(PATHS.BACK.ORDER_PRODUCT_ID(orderProductId), {
          quantity: newQuantity,
        })
          .then((data) => {
            if (data.status === 'deleted') return removeUiProduct(data.id);
          })
          .catch((err) => {
            logException(Errors.FAILURE.UPDATE, err);
            adjustUiQuantity(orderProductId, quantity);
          });
      },
      ...concurrencyControls,
    });
  };

  // checkout

  const checkout = (data) =>
    runExclusive({
      doFetch: () =>
        patchData(`${PATHS.BACK.ORDER_ID(data.orderId)}?action_type=checkout`, {
          ...toServer(data, 'order'),
          status: 'submitted',
        })
          .then((data) => {
            const clientOrder = toClient(data, 'order');
            setCart(null);
            navigate(PATHS.FRONT.ORDER, {
              replace: true,
              state: { order: clientOrder },
            });
          })
          .catch((err) => {
            logException(Errors.FAILURE.UPDATE, err);
            throw err;
          }),
      ...concurrencyControls,
    });

  // cart actions

  const addToCart = async (productId, count = 1) => {
    try {
      const orderProduct = findOrderProduct(productId);

      if (orderProduct) {
        return await adjustQuantity({ orderProduct, delta: count });
      }

      if (cartRef.current)
        return await toast.promise(
          addOrderProduct(cartRef.current.id, productId, count),
          {
            loading: Toasts.ORDER_PRODUCT.CREATE.BUSY,
            error: (err) => {
              if (err.status === 401) {
                navigate(PATHS.FRONT.AUTH_LOGIN);
                return Toasts.ORDER.CREATE.GUEST;
              }
              if (err.status === 403) return Toasts.ORDER.CREATE.ADMIN;
              return err.status || Toasts.ORDER_PRODUCT.CREATE.FAILURE;
            },
          },
        );

      // await the new order so that we can use its id to add the order product
      const newOrder = await toast.promise(addOrder(), {
        loading: Toasts.ORDER.CREATE.BUSY,
        success: Toasts.ORDER.CREATE.SUCCESS,
        error: (err) => {
          if (err.status === 401) {
            navigate(PATHS.FRONT.AUTH_LOGIN);
            return Toasts.ORDER.CREATE.GUEST;
          }
          if (err.status === 403) return Toasts.ORDER.CREATE.ADMIN;
          return err.status || Toasts.ORDER.CREATE.FAILURE;
        },
      });

      if (newOrder)
        return await toast.promise(
          addOrderProduct(newOrder.id, productId, count),
          {
            loading: Toasts.ORDER_PRODUCT.CREATE.BUSY,
            error: (err) => {
              if (err.status === 401) {
                navigate(PATHS.FRONT.AUTH_LOGIN);
                return Toasts.ORDER.CREATE.GUEST;
              }
              if (err.status === 403) return Toasts.ORDER.CREATE.ADMIN;
              return err.status || Toasts.ORDER_PRODUCT.CREATE.FAILURE;
            },
          },
        );
    } catch (err) {
      // catching because await throws errors, which end up uncaught
      return null;
    }
  };

  const takeFromCart = (productId, count = 1) => {
    const delta = -count;

    const orderProduct = findOrderProduct(productId);
    if (!orderProduct) return;

    return adjustQuantity({ orderProduct, delta });
  };

  const resetProduct = (productId) => {
    const orderProduct = findOrderProduct(productId);
    if (!orderProduct) return;

    return adjustQuantity({ orderProduct, shouldRemove: true });
  };

  return {
    loadLocalCart,
    resetLocalCart,
    checkout,
    addToCart,
    takeFromCart,
    resetProduct,
    deleteCart: deleteOrder,
  };
}
