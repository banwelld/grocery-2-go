import { createSlice } from '@reduxjs/toolkit';
import { createMatcher } from '../../../utils/helpers';
import {
  loadLocalCartThunk,
  addToCartThunk,
  takeFromCartThunk,
  resetProductThunk,
  deleteCartThunk,
  checkoutThunk,
} from './cartThunks';

export const CartSlice = Object.freeze({
  NAME: 'cart',
  DATA: 'cartData',
});

const initialState = {
  [CartSlice.DATA]: null,
  cartLoaded: false,
  isPending: false,
};

export const cartSlice = createSlice({
  name: CartSlice.NAME,
  initialState,
  reducers: {
    resetLocalCart: (state) => {
      state.cartData = null;
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(loadLocalCartThunk.fulfilled, (state, action) => {
        state.cartData = action.payload;
        state.cartLoaded = true;
      })
      .addCase(loadLocalCartThunk.rejected, (state) => {
        state.cartLoaded = true;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        const { isNew, product } = action.payload;
        if (!state.cartData) {
          state.cartData = {
            id: product.orderId,
            orderProducts: [product],
          };
        } else {
          if (isNew) {
            state.cartData.orderProducts.push(product);
          } else {
            state.cartData.orderProducts = state.cartData.orderProducts.map((p) =>
              p.id === product.id ? product : p,
            );
          }
        }
      })
      .addCase(takeFromCartThunk.fulfilled, (state, action) => {
        const { isDeleted, id, product } = action.payload;
        if (isDeleted) {
          state.cartData.orderProducts = state.cartData.orderProducts.filter((p) => p.id !== id);
        } else {
          state.cartData.orderProducts = state.cartData.orderProducts.map((p) =>
            p.id === id ? product : p,
          );
        }
      })
      .addCase(resetProductThunk.fulfilled, (state, action) => {
        const { id } = action.payload;
        if (state.cartData?.orderProducts) {
          state.cartData.orderProducts = state.cartData.orderProducts.filter((p) => p.id !== id);
        }
      })
      .addCase(deleteCartThunk.fulfilled, (state) => {
        state.cartData = null;
      })
      .addCase(checkoutThunk.fulfilled, (state) => {
        state.cartData = null;
      })
      .addMatcher(createMatcher(CartSlice.NAME).isPending, (state) => {
        state.isPending = true;
      })
      .addMatcher(createMatcher(CartSlice.NAME).isFulfilled, (state) => {
        state.isPending = false;
      })
      .addMatcher(createMatcher(CartSlice.NAME).isRejected, (state) => {
        state.isPending = false;
      }),
});

export const { resetLocalCart } = cartSlice.actions;

export const selectCartWrapper = (state) => state.cart;
export const selectCartData = (state) => state.cart.cartData;
export const selectIsPending = (state) => state.cart.isPending;
export const selectCartLoaded = (state) => state.cart.cartLoaded;

export const selectOrderTotal = (state) => {
  const products = state.cart?.cartData?.orderProducts ?? [];
  return products.reduce(
    (tally, item) => tally + (item?.product?.priceCents ?? 0) * (item?.quantity ?? 0),
    0,
  );
};

export const selectOrderItemCount = (state) => {
  const products = state.cart.cartData?.orderProducts ?? [];
  return products.reduce((tally, item) => tally + (item?.quantity ?? 0), 0);
};

export default cartSlice.reducer;
