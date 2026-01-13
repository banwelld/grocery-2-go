// /client/src/pages/cart/checkoutConfig.js

import UserInfoView from "./UserInfoView";
import DeliveryAddress from "./AddressInfoView";

export const checkoutSteps = (context) => [
  {
    Component: UserInfoView,
    props: {
      value: context.userConfirmed,
      setState: context.setUserConfirmed,
    },
    validate: () => context.userConfirmed,
  },
  {
    Component: DeliveryAddress,
    props: {
      value: context.address,
      setState: context.setAddress,
    },
    validate: (data) => !!data,
  },
];
