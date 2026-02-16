import useProcessSteps from '../../../../hooks/useProcessSteps';
import useCheckoutProcess from '../../../../hooks/useCheckoutProcess';

import StepControls from './StepControls';

import { checkoutViews } from './checkoutViews';
import { getCheckoutFlow } from './checkoutFlow';
import './checkout.css';

export default function CheckoutProcessController({ pageName: bemBlock }) {
  const context = useCheckoutProcess();
  const { checkoutProcess } = context;

  const steps = getCheckoutFlow(checkoutProcess).map((step) => ({
    ...checkoutViews[step.id],
    props: checkoutViews[step.id].getProps(context),
    isComplete: step.isComplete,
    slug: step.slug,
  }));

  const { Component, props, ...controls } = useProcessSteps(steps);

  const stepControlsProps = {
    controls,
    bemRoot: { bemBlock, bemMod: 'controls' },
  };

  return (
    <Component {...props} bemBlock={bemBlock}>
      <StepControls {...stepControlsProps} />
    </Component>
  );
}
