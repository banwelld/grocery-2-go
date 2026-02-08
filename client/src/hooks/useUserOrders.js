import { useContext } from 'react';
import { UserOrdersContext } from '../features/user/context/UserOrdersContext';

export default function useUserOrders() {
  return useContext(UserOrdersContext);
}
