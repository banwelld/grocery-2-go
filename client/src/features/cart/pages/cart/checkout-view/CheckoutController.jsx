import { checkoutViews } from './checkoutViews';
import { getCheckoutFlow } from './checkoutFlow';
import StepControls from './StepControls';
import useProcessSteps from '../../../../../hooks/useProcessSteps';
import './checkout.css';

export default function CheckoutController({
  checkoutProcess,
  pageName: bemBlock,
}) {
  const steps = getCheckoutFlow(checkoutProcess).map((step) => ({
    ...checkoutViews[step.id],
    props: checkoutViews[step.id].getProps(checkoutProcess),
    validate: step.isComplete,
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
