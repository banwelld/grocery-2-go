export const CheckoutStep = Object.freeze({
  SUMMARY: 'summary',
  USER_INFO: 'identity',
  DELIVERY_INFO: 'address',
  CONFIRMATION: 'confirm',
});

export function getCheckoutFlow(context) {
  return [
    {
      id: CheckoutStep.SUMMARY,
      slug: 'summary',
      isComplete: () => true,
    },
    {
      id: CheckoutStep.USER_INFO,
      slug: 'identity',
      isComplete: () => context.userConfirmed,
    },
    {
      id: CheckoutStep.DELIVERY_INFO,
      slug: 'address',
      isComplete: () => !!context.address.addressLine1,
    },
    {
      id: CheckoutStep.CONFIRMATION,
      slug: 'confirm',
      isComplete: () => true,
    },
  ];
}
