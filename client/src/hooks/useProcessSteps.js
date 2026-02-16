import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

import Feedback from '../config/feedback';

const { Toasts } = Feedback;

export default function useProcessSteps(steps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const stepSlug = searchParams.get('step');
  const currentIndex = Math.max(
    0,
    steps.findIndex((s) => s.slug === stepSlug),
  );

  const currentStep = steps[currentIndex];
  const lastStepIndex = steps.length - 1;

  // verify all prior steps are complete
  useEffect(() => {
    const firstIncompleteIndex = steps.findIndex((step) => !step.isComplete());

    // if user tries to skip steps send back to the first incomplete step
    if (firstIncompleteIndex !== -1 && currentIndex > firstIncompleteIndex) {
      setSearchParams(
        { step: steps[firstIncompleteIndex].slug },
        { replace: true },
      );
    }
  }, [currentIndex, steps, setSearchParams]);

  const goNext = () => {
    if (currentStep.isComplete()) {
      const nextStep = steps[currentIndex + 1];
      if (nextStep) {
        setSearchParams({ step: nextStep.slug });
      }
      return;
    }
    toast.error(Toasts.CHECKOUT.VALIDATION[currentStep.slug]);
  };

  const Component = currentStep.Component;
  const props = currentStep.props;

  return {
    stepIndex: currentIndex,
    goNext,
    Component,
    props,
    isLastStep: currentIndex === lastStepIndex,
    isFirstStep: currentIndex === 0,
  };
}
