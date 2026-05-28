import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import ModalLayer from '../components/ui/feedback/ModalLayer';
import ToasterLayer from '../components/ui/feedback/ToasterLayer';
import { ROUTE_PATHS } from '../config/routePaths';
import { ModalProvider } from '../contexts/ModalContext';
import { ProductProvider } from '../features/collection/context/ProductContext';
import Header from '../features/header/components/Header';
import { checkSessionThunk } from '../features/user/redux/userThunks';

export default function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathname !== ROUTE_PATHS.HOME) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    dispatch(checkSessionThunk());
  }, [dispatch]);

  return (
    <ModalProvider>
      <ProductProvider>
        <div className='site-wrapper'>
          <Header />
          <Outlet />
        </div>
        <ScrollRestoration getKey={(location) => location.pathname} />
        <ModalLayer />
        <ToasterLayer />
      </ProductProvider>
    </ModalProvider>
  );
}
