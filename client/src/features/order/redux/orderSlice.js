import { createSlice } from '@reduxjs/toolkit';
import { loadOrdersThunk } from './orderThunks';
import { checkoutThunk } from '../../cart/redux/cartThunks';

export const OrdersSlice = Object.freeze({
  NAME: 'orders',
  LIST: 'ordersList',
});

const initialState = {
  [OrdersSlice.LIST]: [],
  ordersLoaded: false,
  isPending: false,
};

export const orderSlice = createSlice({
  name: OrdersSlice.NAME,
  initialState,
  reducers: {
    dropOrder: (state, action) => {
      const orderId = Number(action.payload);
      state.ordersList = state.ordersList.filter((order) => order.id !== orderId);
    },
    resetOrders: (state) => {
      state.ordersList = [];
      state.ordersLoaded = false;
      state.isPending = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOrdersThunk.pending, (state) => {
        state.isPending = true;
      })
      .addCase(loadOrdersThunk.fulfilled, (state, action) => {
        state.isPending = false;
        state.ordersList = action.payload;
        state.ordersLoaded = true;
      })
      .addCase(loadOrdersThunk.rejected, (state) => {
        state.isPending = false;
      })
      .addCase(checkoutThunk.fulfilled, (state, action) => {
        // Prepend newly submitted order to history list
        if (action.payload?.clientOrder) {
          state.ordersList.unshift(action.payload.clientOrder);
        }
      });
  },
});

export const { dropOrder, resetOrders } = orderSlice.actions;

export default orderSlice.reducer;
