// /client/src/contexts/CartController.js

import {
  getData,
  postData,
  patchData,
  deleteData,
  runExclusive,
  logException,
  validateOrders,
} from "../helpers/helpers";
import { errorMessages as msg } from "../hooks/constants";

export function createCartController({ setCart, setCartLoaded, navigate, concurrencyControls, cartRef }) {
  // fetch cart (currently auth'd user's orders with status 'open') from server
  const loadCart = () => {
    const fn = () => 
      getData("/orders?status=open")
      .then((data) => setCart(validateOrders(data)))
      .catch((err) => console.error("Fetch order (get) failed: ", err));

    runExclusive({ fn, setIsLoaded: setCartLoaded, ...concurrencyControls });
  };

  const findOrderProduct = (productId) => {
    return cartRef.current?.orderProducts?.find((p) => p.productId === productId) ?? null;
  };

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
        prev.orderProducts?.map((p) =>
          p.id === rowId ? { ...p, quantity: newCount } : p
        ) ?? [],
    }));
  };

  const removeUiProduct = (rowId) => {
    setCart((prev) => ({
      ...prev,
      orderProducts: prev.orderProducts?.filter((p) => p.id !== rowId) ?? [],
    }));
  };

  const resetCart = () => setCart(null);

  // database interactions

  const addOrder = () => {
    const fn = () =>
      postData("/orders", {})
        .then((data) => {
          setCart(data);
          return data;
        })
        .catch((err) => logException(msg.CREATE_NEW_CART, err));
    
    return runExclusive({ fn, ...concurrencyControls });
  };

  const addOrderProduct = (orderId, productId, count = 1) => {
    const fn = () =>
      postData("/order_products", {
        order_id: orderId,
        product_id: productId,
        quantity: count,
      })
        .then((data) => addUiProduct(data))
        .catch((err) => logException(msg.ADD_FIRST_OF_TYPE, err));
    
    return runExclusive({ fn, ...concurrencyControls });
  };

  const removeOrderProduct = (orderProduct) => {
    const { id } = orderProduct;

    const fn = () =>
      deleteData(`/order_products/${id}`)
        .then(() => removeUiProduct(id))
        .catch((err) => logException(msg.REMOVE_PRODUCT, err));

    return runExclusive({ fn, ...concurrencyControls });
  };

  const adjustQuantity = ({orderProduct, delta, resetQuantity = false}) => {
    const { id: orderProductId, quantity } = orderProduct;
    const newQuantity = quantity + delta;

    // reset product if quantity goes to 0 (include less in case of error)
    if (newQuantity <= 0 || resetQuantity) return removeOrderProduct(orderProduct);

    const errorMessage = delta > 0 ? msg.INCREMENT : msg.DECREMENT;
    
    const fn = () => {
      adjustUiQuantity(orderProductId, newQuantity);
      
      return patchData(`/order_products/${orderProductId}`, {quantity: newQuantity})
          .then((data) => {
            if (data.status === "deleted") return removeUiProduct(data.id);
            adjustUiQuantity(data.id, data.quantity);
          })
          .catch((err) => {
            logException(errorMessage, err);
            adjustUiQuantity(orderProductId, quantity);
          });
    };
    return runExclusive({ fn, ...concurrencyControls });
  };

  // checkout

  const checkout = (data, isValid) => {
    if (!isValid()) return;

    const fn = () =>
      patchData(`orders/${data.orderId}?action_type=checkout`, {...data, status: "submitted"})
        .then(() => {
          setCart(null);
          navigate(`/orders/${data.orderId}`);
        })
        .catch((err) => logException(msg.CHECKOUT, err));
    
    return runExclusive({ fn, ...concurrencyControls });
  };

  // cart actions

  const addToCart = async (productId, count = 1) => {    
    const orderProduct = findOrderProduct(productId);

    if (!orderProduct) {
      const cart = cartRef.current;
      if (!cart) {
        // await the new order so that we can use its id to add the order product
        const newOrder = await addOrder();
        if (newOrder) {
          return addOrderProduct(newOrder.id, productId, count);
        }
        return;
      }
      return addOrderProduct(cart.id, productId, count);
    }
    return adjustQuantity({orderProduct, delta: count});
  };

  const takeFromCart = (productId, count = 1) => {
    const delta = -count;

    const orderProduct = findOrderProduct(productId);
    if (!orderProduct) return;

    return adjustQuantity({orderProduct, delta});
  };

  const resetProduct = (productId) => {
    const orderProduct = findOrderProduct(productId);
    if (!orderProduct) return;

    return adjustQuantity({orderProduct, resetQuantity: true});
  };

  return { loadCart, resetCart, checkout, addToCart, takeFromCart, resetProduct };
}
