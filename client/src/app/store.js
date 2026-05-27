import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CartSlice } from '../features/cart/redux/cartSlice';
import orderReducer, { OrdersSlice } from '../features/order/redux/orderSlice';

export const store = configureStore({
  reducer: {
    [CartSlice.NAME]: cartReducer,
    [OrdersSlice.NAME]: orderReducer,
  },
});
