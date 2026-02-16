import { CheckoutStep } from './checkoutFlow';
import AddressInfoView from './delivery-view/DeliveryView';
import OrderConfirmationView from './OrderConfirmationView';
import UserInfoView from './confirm-user-view/ConfirmUserView';
import CartSummaryView from './cart-summary-view/CartSummaryView';

export const checkoutViews = {
  [CheckoutStep.SUMMARY]: {
    Component: CartSummaryView,
    getProps: (context) => ({
      cart: context.cart,
      bemRoot: { bemBlock: 'checkout', bemMod: 'summary' },
    }),
  },
  [CheckoutStep.USER_INFO]: {
    Component: UserInfoView,
    getProps: (context) => ({
      value: context.checkoutProcess.userConfirmed,
      setState: context.checkoutProcess.setUserConfirmed,
      bemRoot: { bemBlock: 'checkout', bemMod: 'confirm-user' },
    }),
  },
  [CheckoutStep.DELIVERY_INFO]: {
    Component: AddressInfoView,
    getProps: (context) => ({
      value: context.checkoutProcess.address,
      setState: context.checkoutProcess.setAddress,
      bemRoot: { bemBlock: 'checkout', bemMod: 'address' },
    }),
  },
  [CheckoutStep.CONFIRMATION]: {
    Component: OrderConfirmationView,
    getProps: (context) => ({
      value: context.checkoutProcess.address,
      setState: context.checkoutProcess.setAddress,
      bemRoot: { bemBlock: 'checkout', bemMod: 'confirmation' },
    }),
  },
};
