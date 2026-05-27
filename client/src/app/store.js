import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CartSlice } from '../features/cart/redux/cartSlice';
import orderReducer, { OrdersSlice } from '../features/order/redux/orderSlice';
import userReducer, { UserSlice } from '../features/user/redux/userSlice';

export const store = configureStore({
  reducer: {
    [CartSlice.NAME]: cartReducer,
    [OrdersSlice.NAME]: orderReducer,
    [UserSlice.NAME]: userReducer,
  },
});
