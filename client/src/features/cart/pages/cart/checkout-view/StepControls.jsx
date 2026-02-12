import toast from 'react-hot-toast';
import { toBemClassName } from '../../../../../utils/helpers';
import Button from '../../../../../components/ui/Button';
import useCheckoutProcess from '../../../../../hooks/useCheckoutProcess';
import Feedback from '../../../../../config/feedback';
import { useModal } from '../../../../../hooks/useModal';

const Labels = Object.freeze({
  PREV: 'previous',
  NEXT: 'next',
  SUBMIT: 'submit',
});

const { Toasts, Modals } = Feedback;

export default function StepControls({ controls, bemRoot }) {
  const {
    cart,
    checkoutProcess: { checkout, resetSession },
  } = useCheckoutProcess();

  const orderItemCount = cart?.orderItemCount;

  const { openModal } = useModal();

  const { isFirstStep, isLastStep, goBack, goNext } = controls;

  const confirmAndCheckout = () => {
    if (orderItemCount < 1) return toast.error(Toasts.ORDER.SUBMIT.EMPTY_CART);

    openModal({
      uiText: Modals.CONFIRM_CHECKOUT,
      confirmLabel: 'Place Order!',
      closeLabel: 'Cancel',
      handleConfirm: () =>
        toast.promise(checkout, {
          loading: Toasts.ORDER.SUBMIT.BUSY,
          success: Toasts.ORDER.SUBMIT.SUCCESS,
          error: Toasts.ORDER.SUBMIT.FAILURE,
        }),
      withClose: () => resetSession(),
    });
  };

  const prevButtonProps = {
    onClick: goBack,
    label: Labels.PREV,
    bemMod: Labels.PREV,
    bemMod2: 'page-utility',
    showMod2: true,
  };

  const nextButtonProps = {
    onClick: goNext,
    label: Labels.NEXT,
    bemMod: Labels.NEXT,
    bemMod2: 'page-utility',
    showMod2: true,
  };

  const submitButtonProps = {
    onClick: confirmAndCheckout,
    label: Labels.SUBMIT,
    bemMod: Labels.SUBMIT,
    bemMod2: 'page-utility',
    showMod2: true,
  };

  return (
    <div className={toBemClassName({ ...bemRoot, bemElem: 'wrapper' })}>
      {!isFirstStep && <Button {...prevButtonProps} />}
      {!isLastStep && <Button {...nextButtonProps} />}
      {isLastStep && <Button {...submitButtonProps} />}
    </div>
  );
}
