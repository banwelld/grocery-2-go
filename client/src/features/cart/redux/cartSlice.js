import { createSlice } from '@reduxjs/toolkit';
import { createMatcher } from '../../../utils/helpers';

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
    setCart: (state, action) => (state.cartData = action.payload),
    setCartLoaded: (state, action) => (state.cartLoaded = action.payload),
    setIsPending: (state, action) => (state.isPending = action.payload),
    resetLocalCart: (state) => (state.cartData = null),

    adjustUiQuantity: (state, action) => {
      const { rowId, newCount } = action.payload;

      if (!!state.cartData && !!state.cartData.orderProducts)
        state.cartData.orderProducts = state.cartData.orderProducts.map(
          (product) =>
            product.id === rowId ? { ...product, quantity: newCount } : product,
        );
    },

    removeUiProduct: (state, action) => {
      const rowId = action.payload;

      if (!!state.cartData && !!state.cartData.orderProducts)
        state.cartData.orderProducts = state.cartData.orderProducts.filter(
          (product) => product.id !== rowId,
        );
    },

    addUiProduct: (state, action) => {
      const product = action.payload;

      if (state?.cartData?.orderProducts)
        state.cartData.orderProducts.push(product);
    },
  },

  extraReducers: (builder) =>
    builder
      .addMatcher(
        createMatcher(CartSlice.NAME).isPending,
        (state) => (state.isPending = true),
      )
      .addMatcher(
        createMatcher(CartSlice.NAME).isFulfilled,
        (state) => (state.isPending = false),
      )
      .addMatcher(
        createMatcher(CartSlice.NAME).isRejected,
        (state) => (state.isPending = false),
      ),
});

export const {
  setCart,
  setCartLoaded,
  setIsPending,
  resetLocalCart,
  adjustUiQuantity,
  removeUiProduct,
  addUiProduct,
} = cartSlice.actions;

export const selectCartWrapper = (state) => state.cart;
export const selectCartData = (state) => state.cart.cartData;
export const selectIsPending = (state) => state.cart.isPending;
export const selectCartLoaded = (state) => state.cart.cartLoaded;

export const selectOrderTotal = (state) => {
  const products = state.cart?.cartData?.orderProducts ?? [];
  return products.reduce(
    (tally, item) =>
      tally + (item?.product?.priceCents ?? 0) * (item?.quantity ?? 0),
    0,
  );
};

export const selectOrderItemCount = (state) => {
  const products = state.cart.cartData?.orderProducts ?? [];
  return products.reduce((tally, item) => tally + (item?.quantity ?? 0), 0);
};

export default cartSlice.reducer;
