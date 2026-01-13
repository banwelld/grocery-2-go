// /client/src/app/AppLayout.jsx

import { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import useUser from "../hooks/useUser";
import useCart from "../hooks/useCart";
import SiteHeader from "../components/site-header/SiteHeader";
import ModalLayer from "../components/feedback/ModalLayer";

export default function AppLayout() {
  const { user } = useUser();
  const { loadCart, resetCart } = useCart();

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      resetCart();
    }
  }, [user, loadCart, resetCart]);

  return (
    <>
      <div className='site-wrapper'>
        <SiteHeader />
        <Outlet />
      </div>
      <ScrollRestoration getKey={(location) => location.pathname} />
      <ModalLayer />
    </>
  );
};