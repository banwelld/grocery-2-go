import { useEffect } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useUser from '../features/user/hooks/useUser';
import useCart from '../hooks/useCart';
import { resetOrders } from '../features/order/redux/orderSlice';

import ModalLayer from '../components/ui/feedback/ModalLayer';
import ToasterLayer from '../components/ui/feedback/ToasterLayer';
import { UserRole } from '../config/enums';
import PATHS from '../config/paths';
import Header from '../features/header/components/Header';

export default function AppLayout() {
  const { pathname } = useLocation();
  const { cartStatus } = useCart() ?? {};
  const { user } = useUser() ?? {};
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathname !== PATHS.FRONT.HOME) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  const loadLocalCart = cartStatus?.loadLocalCart;
  const resetLocalCart = cartStatus?.resetLocalCart;
  const userId = user?.id;
  const userRole = user?.role;

  useEffect(() => {
    if (userId && userRole === UserRole.CUSTOMER) {
      loadLocalCart();
    } else {
      resetLocalCart();
      dispatch(resetOrders());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, userRole, dispatch]);

  return (
    <>
      <div className='site-wrapper'>
        <Header />
        <Outlet />
      </div>
      <ScrollRestoration getKey={(location) => location.pathname} />
      <ModalLayer />
      <ToasterLayer />
    </>
  );
}
