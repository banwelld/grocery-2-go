import { createAsyncThunk } from '@reduxjs/toolkit';
import Feedback from '../../../config/feedback';
import PATHS from '../../../config/paths';
import { deleteData, getData, logException, patchData, postData } from '../../../utils/helpers';
import { toClient, toServer } from '../../../utils/serializer';
import {
  addUiProduct,
  adjustUiQuantity,
  removeUiProduct,
  resetLocalCart,
  setCart,
  setCartLoaded,
} from './cartSlice';

const { Errors } = Feedback;

export const loadLocalCartThunk = createAsyncThunk(
  'cart/loadLocalCart',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const orderData = await getData(`${PATHS.BACK.ORDERS}?status=open&action_type=cart_load`);

      if (!Array.isArray(orderData)) {
        logException(Errors.INVALID.DATA('array', typeof orderData), orderData);
        return rejectWithValue(Errors.INVALID.DATA('array', typeof orderData));
      }

      const cartData = orderData.find((order) => order.status === 'open');
      const clientCartData = cartData ? toClient(cartData, 'order') : null;

      if (!!clientCartData) dispatch(setCart(clientCartData));
      dispatch(setCartLoaded(true));

      return clientCartData;
    } catch (err) {
      logException(Errors.FAILURE.RECEIVE, err);
      dispatch(setCartLoaded(true));
      rejectWithValue(err);
    }
  },
  {
    condition: (_, { getState }) => {
      const { cart } = getState();
      if (cart.isPending) return false;
      return true;
    },
  },
);

export const addToCartThunk = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, count = 1 }, { dispatch, getState, rejectWithValue }) => {
    const { cart } = getState();
    const currentCart = cart.cartData;
    let existingProduct;

    try {
      existingProduct = currentCart?.orderProducts?.find(
        (product) => product.productId === productId,
      );

      if (!!existingProduct) {
        const newQuantity = existingProduct.quantity + count;

        dispatch(
          adjustUiQuantity({
            rowId: existingProduct.id,
            newCount: newQuantity,
          }),
        );

        await patchData(PATHS.BACK.ORDER_PRODUCT_ID(existingProduct.id), {
          quantity: newQuantity,
        });

        return { success: true, updatedProductId: existingProduct.id };
      } else {
        const activeOrderId = currentCart?.id;

        const productData = await postData(
          PATHS.BACK.ORDER_PRODUCTS,
          toServer({ orderId: activeOrderId, productId, quantity: count }, 'order_product'),
        );

        const newClientProduct = toClient(productData, 'order_product');

        if (!activeOrderId)
          dispatch(
            setCart({
              id: newClientProduct.orderId,
              orderProducts: [],
            }),
          );

        dispatch(addUiProduct(newClientProduct));

        return { success: true, addedProduct: newClientProduct };
      }
    } catch (err) {
      logException(Errors.FAILURE.PATCH, err);

      if (!!existingProduct)
        dispatch(
          adjustUiQuantity({
            rowId: existingProduct.id,
            newCount: existingProduct.quantity,
          }),
        );
      return rejectWithValue(err);
    }
  },
);

export const takeFromCartThunk = createAsyncThunk(
  'cart/takeFromCart',
  async ({ productId, count = 1 }, { dispatch, getState, rejectWithValue }) => {
    const { cart } = getState();
    const currentCart = cart.cartData;
    let existingProduct;

    try {
      existingProduct = currentCart?.orderProducts?.find(
        (product) => product.productId === productId,
      );

      if (!existingProduct) return;

      const newQuantity = existingProduct.quantity - count;

      dispatch(
        adjustUiQuantity({
          rowId: existingProduct.id,
          newCount: newQuantity,
        }),
      );

      await patchData(PATHS.BACK.ORDER_PRODUCT_ID(existingProduct.id), {
        quantity: newQuantity,
      });

      return { success: true, updatedProductId: existingProduct.id };
    } catch (err) {
      logException(Errors.FAILURE.PATCH, err);

      if (!!existingProduct)
        dispatch(
          adjustUiQuantity({
            rowId: existingProduct.id,
            newCount: existingProduct.quantity,
          }),
        );
      return rejectWithValue(err);
    }
  },
);

export const resetProductThunk = createAsyncThunk(
  'cart/resetProduct',
  async ({ productId }, { dispatch, getState, rejectWithValue }) => {
    const { cart } = getState();
    const currentCart = cart.cartData;
    let existingProduct;

    try {
      existingProduct = currentCart?.orderProducts?.find(
        (product) => product.productId === productId,
      );

      if (!existingProduct) return;

      dispatch(removeUiProduct(existingProduct.id));
      await deleteData(PATHS.BACK.ORDER_PRODUCT_ID(existingProduct.id));

      return { success: true, updatedProductId: existingProduct.id };
    } catch (err) {
      logException(Errors.FAILURE.DELETE, err);

      if (!!existingProduct) dispatch(addUiProduct(existingProduct));
      dispatch(
        adjustUiQuantity({
          rowId: existingProduct.id,
          newCount: existingProduct.quantity,
        }),
      );
      return rejectWithValue(err);
    }
  },
);

export const deleteCartThunk = createAsyncThunk(
  'cart/deleteCart',
  async (_, { dispatch, getState, rejectWithValue }) => {
    const { cart } = getState();
    const currentCart = cart.cartData;

    try {
      const cartEmpty = currentCart?.orderProducts?.length < 1 ?? false;
      if (cartEmpty) return;

      dispatch(resetLocalCart());
      await deleteData(PATHS.BACK.ORDER_ID(currentCart.id));
      return { success: true, deletedOrderId: currentCart.id };
    } catch (err) {
      logException(Errors.FAILURE.DELETE, err);
      dispatch(setCart(currentCart));
      return rejectWithValue(err);
    }
  },
);

export const checkoutThunk = createAsyncThunk(
  'cart/checkout',
  async (_, { dispatch, getState, rejectWithValue }) => {
    const { cart } = getState();
    const currentCart = cart.cartData;

    try {
      dispatch(resetLocalCart());

      const serverOrder = toServer(currentCart, 'order');

      const confirmation = await patchData(
        `${PATHS.BACK.ORDER_ID(currentCart.id)}?action_type=checkout`,
        { ...serverOrder, status: 'submitted' },
      );

      const clientOrder = toClient(confirmation, 'order');
      return { success: true, clientOrder };
    } catch (err) {
      logException(Errors.FAILURE.UPDATE, err);
      dispatch(setCart(currentCart));
      return rejectWithValue(err);
    }
  },
);
