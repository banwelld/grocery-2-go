import { useEffect } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';

import useCart from '../hooks/useCart';
import useUser from '../features/user/hooks/useUser';

import Header from '../features/header/components/Header';
import ModalLayer from '../components/ui/feedback/ModalLayer';
import ToasterLayer from '../components/ui/feedback/ToasterLayer';
import { UserRole } from '../config/enums';

export default function AppLayout() {
  const { pathname } = useLocation();
  const { cartStatus } = useCart() ?? {};
  const { user } = useUser() ?? {};

  const loadCart = cartStatus?.loadCart;
  const resetCart = cartStatus?.resetCart;

  useEffect(() => {
    if (pathname !== '/') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    if (user && user.role === UserRole.CUSTOMER) {
      loadCart();
    } else {
      resetCart();
    }
  }, [user, loadCart, resetCart]);

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
