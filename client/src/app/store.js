import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CartSlice } from '../features/cart/redux/cartSlice';

export const store = configureStore({
  reducer: {
    [CartSlice.NAME]: cartReducer,
  },
});
