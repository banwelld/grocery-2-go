import { useContext } from 'react';
import { OrderContext } from '../features/order/context/OrderContext';

export const useOrder = () => useContext(OrderContext);
