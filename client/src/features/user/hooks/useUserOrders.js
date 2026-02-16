import { useContext } from 'react';
import { UserOrdersContext } from '../context/UserOrdersContext';

export default function useUserOrders() {
  return useContext(UserOrdersContext);
}
