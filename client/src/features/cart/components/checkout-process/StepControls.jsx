import toast from 'react-hot-toast';

import { useModal } from '../../../../hooks/useModal';
import useCheckoutProcess from '../../../../hooks/useCheckoutProcess';

import Button from '../../../../components/ui/Button';

import Feedback from '../../../../config/feedback';
import { toBemClassName } from '../../../../utils/helpers';

const Labels = Object.freeze({
  CHECKOUT: 'check me out!',
  NEXT: 'next',
  SUBMIT: 'submit',
});

const { Toasts, Modals } = Feedback;

export default function StepControls({ controls, bemRoot }) {
  const { cart, checkoutProcess } = useCheckoutProcess();
  const { openModal } = useModal();

  const { isFirstStep, isLastStep, goNext } = controls;

  const confirmAndCheckout = () => {
    if (cart?.orderItemCount < 1)
      return toast.error(Toasts.ORDER.SUBMIT.EMPTY_CART);

    openModal({
      uiText: Modals.CONFIRM_CHECKOUT,
      confirmLabel: 'Place Order!',
      closeLabel: 'Cancel',
      handleConfirm: () =>
        toast.promise(checkoutProcess?.checkout, {
          loading: Toasts.ORDER.SUBMIT.BUSY,
          success: Toasts.ORDER.SUBMIT.SUCCESS,
          error: Toasts.ORDER.SUBMIT.FAILURE,
        }),
      withClose: () => checkoutProcess?.resetSession(),
    });
  };

  const nextButton = (
    <Button
      onClick={goNext}
      label={isFirstStep ? Labels.CHECKOUT : Labels.NEXT}
      bemMod={Labels.NEXT}
      bemMod2='page-utility'
      showMod2={true}
    />
  );

  const submitButton = (
    <Button
      onClick={confirmAndCheckout}
      label={Labels.SUBMIT}
      bemMod={Labels.SUBMIT}
      bemMod2='page-utility'
      showMod2={true}
    />
  );

  return (
    <div className={toBemClassName({ ...bemRoot, bemElem: 'wrapper' })}>
      {!isLastStep && nextButton}
      {isLastStep && submitButton}
    </div>
  );
}
