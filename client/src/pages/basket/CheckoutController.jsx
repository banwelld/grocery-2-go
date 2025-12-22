// /client/src/pages/basket/CheckoutController.jsx

import { useCheckout } from "../../contexts/CheckoutContext";
import useProcessSteps from "../../hooks/useProcessSteps";
import StepControls from "./StepControls";
import { checkoutSteps } from "./checkoutConfig";

export default function CheckoutController({ bemBlock }) {
  const { ...ctx } = useCheckout();

  const { StepComponent, props, ...controls } = useProcessSteps(checkoutSteps(ctx));

  return (
    <StepComponent {...props}>
      <StepControls {...controls} {...{ bemBlock, bemElem: "controls" }} />
    </StepComponent>
  );
}
