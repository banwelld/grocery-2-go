export const CheckoutStep = Object.freeze({
  USER_INFO: "USER_INFO",
  ADDRESS_INFO: "ADDRESS_INFO",
  CONFIRMATION: "CONFIRMATION",
});

export function getCheckoutFlow(context) {
  return [
    {
      id: CheckoutStep.USER_INFO,
      isComplete: () => context.userConfirmed,
    },
    {
      id: CheckoutStep.ADDRESS_INFO,
      isComplete: () => !!context.address,
    },
    {
      id: CheckoutStep.CONFIRMATION,
      isComplete: () => true,
    },
  ];
}
