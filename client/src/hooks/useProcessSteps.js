// /client/src/hooks/useProcessSteps.js

import { useState } from "react";

export default function useProcessSteps(steps) {
  const [stepIndex, setStepIndex] = useState(0);

  const currentComponent = steps[stepIndex];
  const lastStepIndex = steps.length - 1;

  const goNext = () => {
    if (currentComponent.validate()) {
      setStepIndex((i) => Math.min(i + 1, lastStepIndex));
    }
  };

  const goBack = () => setStepIndex((i) => Math.max(i - 1, 0));

  const goTo = (stepIndex) =>
    setStepIndex(() => Math.min(Math.max(stepIndex, 0), lastStepIndex));

  const StepComponent = currentComponent.Component;
  const props = currentComponent.props;

  return {
    stepIndex,
    goNext,
    goBack,
    goTo,
    StepComponent,
    props,
    isLastStep: stepIndex === lastStepIndex,
    isFirstStep: stepIndex === 0,
  };
}
