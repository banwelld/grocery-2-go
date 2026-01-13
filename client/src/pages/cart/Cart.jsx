// /client/src/pages/cart/Cart.jsx

import { useCallback } from "react";
import { CheckoutProcessProvider } from "../../contexts/CheckoutProcessContext";
import useCheckoutProcess from "../../hooks/useCheckoutProcess";
import useUser from "../../hooks/useUser";
import PageFrame from "../../components/section-frames/PageFrame";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import ErrorPage from "../ErrorPage";
import Button from "../../components/ui/Button";
import { PageName, CartPageMode as PageMode } from "../enums";
import { headings, uiText } from "../../strings";
import "./cart.css";


export const ButtonLabel = Object.freeze({
  [PageMode.CART]: "Checkout!",
  [PageMode.CHECKOUT]: "View Cart",
});

export default function Cart() {
  const { isLoggedIn } = useUser();

  if (!isLoggedIn) {
    return (
      <ErrorPage
        heading={headings.WHOOPS}
        uiText={uiText.NOT_LOGGED_IN}
      />
    );
  }

  return (
    <CheckoutProcessProvider>
      <CartController />
    </CheckoutProcessProvider >
  );
}

const CartController = () => {
  const { checkout, viewMode, cart } = useCheckoutProcess();
  const { modeVariant, togglePageMode } = viewMode;
  const { products, cartLoaded } = cart;

  const cartEmpty = cartLoaded && !products?.length >= 1;

  const ToggleModeButton = useCallback(() => (
    <Button
      onClick={togglePageMode}
      label={ButtonLabel[modeVariant]}
      disabled={cartEmpty}
    />
  ), [modeVariant, togglePageMode, cartEmpty]);

  const sidebarPayload = { ToggleModeButton };
  const mainPayload = { cart, cartEmpty, modeVariant, cartLoaded, checkout };

  return (
    <PageFrame
      sidebar={<Sidebar {...sidebarPayload} />}
      mainContent={<MainContent {...mainPayload} />}
      pageName={PageName.CART}
    />
  )
}