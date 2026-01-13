// /client/src/pages/cart/MainContent.jsx

import ContentSection from "../../components/section-frames/ContentSection";
import CheckoutController from "./checkout-view/CheckoutController";
import CartLayout from "./cart-view/CartLayout";
import ErrorPage from "../../pages/ErrorPage";
import { headings, uiText as text } from "../../strings";
import { CartPageMode as PageMode } from "../enums";

const bemBlock = "checkout";

export default function MainContent({ cart, modeVariant, cartLoaded, checkout }) {
  const { products, orderItemCount, orderTotal } = cart;

  if (cartLoaded && !products?.length >= 1) {
    return (
      <ErrorPage
        heading={headings.CART_EMPTY}
        uiText={text.CART_EMPTY}
      />
    )
  }

  const contentMap = {
    [PageMode.CART]: {
      heading: headings.CART,
      uiText: cartLoaded && !!products?.length && text.CART,
    },
    [PageMode.CHECKOUT]: {
      heading: headings.CHECKOUT,
      uiText: cartLoaded && !!products?.length && text.CHECKOUT_USER,
    },
  };

  const layoutProps = {
    products, orderItemCount, orderTotal, cartLoaded, bemBlock
  }

  return (
    <ContentSection isTopLevel {...contentMap[modeVariant]}>
      {modeVariant === PageMode.CART ? (
        <CartLayout {...layoutProps} />
      ) : (
        <CheckoutController checkout={checkout} bemBlock={bemBlock} />
      )}
    </ContentSection >
  );
}
