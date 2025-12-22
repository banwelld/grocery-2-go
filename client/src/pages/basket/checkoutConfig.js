// /client/src/pages/basket/checkoutConfig.js

import ViewBasket from "./ViewBasket";
import ConfirmUser from "./ConfirmUser";
import DeliveryAddress from "./DeliveryInfo";

export const checkoutSteps = (context) => [
  {
    Component: ViewBasket,
    props: {
      products: context.products,
      prodCount: context.itemCount,
      total: context.orderTotal,
    },
    validate: () => true,
  },
  {
    Component: ConfirmUser,
    props: {
      value: context.userConfirmed,
      setterFn: context.setUserConfirmed,
    },
    validate: () => context.userConfirmed,
  },
  {
    Component: DeliveryAddress,
    props: {
      value: context.deliveryInfo,
      setterFn: context.setDeliveryInfo,
    },
    validate: () => !!context.deliveryInfo,
  },
];
