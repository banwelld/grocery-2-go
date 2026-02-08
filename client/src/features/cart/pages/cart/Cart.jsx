import { CheckoutProcessProvider } from '../../context/CheckoutProcessContext';
import useCheckoutProcess from '../../../../hooks/useCheckoutProcess';
import PageContent from './PageContent';
import Sidebar from './Sidebar';
import ErrorPage from '../../../../pages/ErrorPage';
import PageFrame from '../../../../components/ui/frames/PageFrame';
import Button from '../../../../components/ui/Button';

import { Headings, UiText } from '../../../../config/constants';
import { PageName, CartViewMode as Mode } from '../../../../config/enums';

export const ButtonLabel = Object.freeze({
  [Mode.CART]: 'Checkout!',
  [Mode.CHECKOUT]: 'View Cart',
});

const pageName = PageName.CART;

export default function Cart() {
  return (
    <CheckoutProcessProvider>
      <CartController />
    </CheckoutProcessProvider>
  );
}

const CartController = () => {
  const { checkoutProcess, viewMode, cart, user } = useCheckoutProcess();
  const { products, cartEmpty, cartLoaded, orderItemCount, orderTotal } = cart;
  const { currentViewMode, toggleViewMode } = viewMode;
  const { isLoggedIn } = user;

  if (!isLoggedIn) {
    return (
      <ErrorPage heading={Headings.WHOOPS} UiText={UiText.NOT_LOGGED_IN} />
    );
  }

  if (cartEmpty) {
    return (
      <ErrorPage heading={Headings.CART_EMPTY} uiText={UiText.CART_EMPTY} />
    );
  }

  const toggleViewModeButton = (
    <Button
      onClick={toggleViewMode}
      label={ButtonLabel[currentViewMode]}
      bemMod='page-utility'
      disabled={cartEmpty}
    />
  );

  const sidebarProps = { toggleViewModeButton, pageName };
  const mainProps = {
    products,
    currentViewMode,
    cartLoaded,
    cartEmpty,
    cartTotalsProps: { orderItemCount, orderTotal },
    checkoutProps: { checkoutProcess, pageName },
  };

  return (
    <PageFrame
      Sidebar={<Sidebar {...sidebarProps} />}
      PageContent={<PageContent {...mainProps} />}
      pageName={pageName}
    />
  );
};
