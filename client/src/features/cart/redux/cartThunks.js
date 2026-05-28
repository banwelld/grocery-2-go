import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_ENDPOINT } from '../../../config/apiEndpoints';
import Feedback from '../../../config/feedback';
import {
  deleteData,
  getData,
  logException,
  patchData,
  postData,
  serializeError,
} from '../../../utils/helpers';
import { toClient, toServer } from '../../../utils/serializer';

const { Errors } = Feedback;

export const loadLocalCartThunk = createAsyncThunk(
  'cart/loadLocalCart',
  async (_, { rejectWithValue }) => {
    const url = `${API_ENDPOINT.ORDERS}?status=open&action_type=cart_load`;
    const getOpenOrder = (order) => order.status === 'open';

    try {
      const orderData = await getData(url);
      if (!Array.isArray(orderData)) {
        logException(Errors.INVALID.DATA('array', typeof orderData), orderData);
        return rejectWithValue(Errors.INVALID.DATA('array', typeof orderData));
      }
      const cartData = orderData.find(getOpenOrder);
      return cartData ? toClient(cartData, 'order') : null;
    } catch (err) {
      logException(Errors.FAILURE.RECEIVE, err);
      return rejectWithValue(serializeError(err));
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
  async ({ productId, count = 1 }, { getState, rejectWithValue }) => {
    const { cart } = getState();
    const currentCart = cart.cartData;
    const existingProduct = currentCart?.orderProducts?.find(
      (product) => product.productId === productId,
    );

    try {
      if (existingProduct) {
        const newQuantity = existingProduct.quantity + count;
        const res = await patchData(API_ENDPOINT.ORDER_PRODUCT_ID(existingProduct.id), {
          quantity: newQuantity,
        });
        return { isNew: false, product: toClient(res, 'order_product') };
      } else {
        const activeOrderId = currentCart?.id;
        const payload = toServer(
          { orderId: activeOrderId, productId, quantity: count },
          'order_product',
        );
        const res = await postData(API_ENDPOINT.ORDER_PRODUCTS, payload);
        return { isNew: true, product: toClient(res, 'order_product') };
      }
    } catch (err) {
      logException(Errors.FAILURE.PATCH, err);
      return rejectWithValue(serializeError(err));
    }
  },
);

export const takeFromCartThunk = createAsyncThunk(
  'cart/takeFromCart',
  async ({ productId, count = 1 }, { getState, rejectWithValue }) => {
    const { cart } = getState();
    const currentCart = cart.cartData;
    const existingProduct = currentCart?.orderProducts?.find(
      (product) => product.productId === productId,
    );
    if (!existingProduct) return rejectWithValue('Product not found in cart');

    const newQuantity = existingProduct.quantity - count;

    try {
      const res = await patchData(API_ENDPOINT.ORDER_PRODUCT_ID(existingProduct.id), {
        quantity: newQuantity,
      });
      // The server returns {"id": id, "status": "deleted"} or the updated order_product object
      return {
        isDeleted: newQuantity <= 0,
        id: existingProduct.id,
        product: newQuantity > 0 ? toClient(res, 'order_product') : null,
      };
    } catch (err) {
      logException(Errors.FAILURE.PATCH, err);
      return rejectWithValue(serializeError(err));
    }
  },
);

export const resetProductThunk = createAsyncThunk(
  'cart/resetProduct',
  async ({ productId }, { getState, rejectWithValue }) => {
    const { cart } = getState();
    const currentCart = cart.cartData;
    const existingProduct = currentCart?.orderProducts?.find(
      (product) => product.productId === productId,
    );
    if (!existingProduct) return rejectWithValue('Product not found in cart');

    try {
      await deleteData(API_ENDPOINT.ORDER_PRODUCT_ID(existingProduct.id));
      return { id: existingProduct.id };
    } catch (err) {
      logException(Errors.FAILURE.DELETE, err);
      return rejectWithValue(serializeError(err));
    }
  },
);

export const deleteCartThunk = createAsyncThunk(
  'cart/deleteCart',
  async (_, { getState, rejectWithValue }) => {
    const { cart } = getState();
    const currentCart = cart.cartData;
    const hasProducts = currentCart?.orderProducts && currentCart?.orderProducts?.length > 0;

    if (!hasProducts) return null;

    try {
      await deleteData(API_ENDPOINT.ORDER_ID(currentCart.id));
      return { id: currentCart.id };
    } catch (err) {
      logException(Errors.FAILURE.DELETE, err);
      return rejectWithValue(serializeError(err));
    }
  },
);

export const checkoutThunk = createAsyncThunk(
  'cart/checkout',
  async (addressPayload, { getState, rejectWithValue }) => {
    const { cart } = getState();
    const currentCart = cart.cartData;
    const url = `${API_ENDPOINT.ORDER_ID(currentCart.id)}?action_type=checkout`;
    const serverPayload = toServer({ ...addressPayload, status: 'submitted' }, 'order');

    try {
      const res = await patchData(url, serverPayload);
      return toClient(res, 'order');
    } catch (err) {
      logException(Errors.FAILURE.UPDATE, err);
      return rejectWithValue(serializeError(err));
    }
  },
);
