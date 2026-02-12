import { CheckoutStep } from "./checkoutFlow";
import AddressInfoView from "./AddressView";
import OrderConfirmationView from "./OrderConfirmationView";
import UserInfoView from "./UserInfoView";

export const checkoutViews = {
  [CheckoutStep.USER_INFO]: {
    Component: UserInfoView,
    getProps: (context) => ({
      value: context.userConfirmed,
      setState: context.setUserConfirmed,
      bemRoot: { bemBlock: "checkout", bemMod: "user-info" },
    }),
  },
  [CheckoutStep.ADDRESS_INFO]: {
    Component: AddressInfoView,
    getProps: (context) => ({
      value: context.address,
      setState: context.setAddress,
      bemRoot: { bemBlock: "checkout", bemMod: "address" },
    }),
  },
  [CheckoutStep.CONFIRMATION]: {
    Component: OrderConfirmationView,
    getProps: (context) => ({
      value: context.address,
      setState: context.setAddress,
      bemRoot: { bemBlock: "checkout", bemMod: "confirmation" },
    }),
  },
};
