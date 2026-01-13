// /client/src/pages/cart/CheckoutController.jsx

import useCheckoutProcess from "../../../hooks/useCheckoutProcess";
import useProcessSteps from "../../../hooks/useProcessSteps";
import StepControls from "./StepControls";
import { getCheckoutFlow } from "./checkoutFlow";
import { checkoutViews } from "./checkoutViews";
import "./checkout.css";

export default function CheckoutController({ bemBlock }) {
  const { checkout } = useCheckoutProcess();

  const steps = getCheckoutFlow(checkout).map((step) => ({
    ...checkoutViews[step.id],
    props: checkoutViews[step.id].getProps(checkout),
    validate: step.isComplete,
  }));

  const { Component, props, ...controls } = useProcessSteps(steps);

  const stepControlsProps = {
    controls,
    bemBlock,
    bemMod: "controls"
  }

  return (
    <Component {...props} bemBlock={bemBlock}>
      <StepControls {...stepControlsProps} />
    </Component>
  );
}
