import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { CheckoutProcessProvider } from '../context/CheckoutProcessContext';
import useCheckoutProcess from '../../../hooks/useCheckoutProcess';
import { useModal } from '../../../hooks/useModal';

import PageContent from './PageContent';
import Sidebar from './Sidebar';
import CheckoutProcessController from '../components/checkout-process/CheckoutProcessController';
import PageFrame from '../../../components/ui/frames/PageFrame';
import Button from '../../../components/ui/Button';

import Feedback from '../../../config/feedback';
import { PageName } from '../../../config/enums';

const { Toasts, Modals } = Feedback;

const pageName = PageName.CART;

export default function Cart() {
  return (
    <CheckoutProcessProvider>
      <CartPageController />
    </CheckoutProcessProvider>
  );
}

const CartPageController = () => {
  const { cart } = useCheckoutProcess();
  const { cartEmpty, deleteCart } = cart;
  const { openModal } = useModal();
  const [searchParams] = useSearchParams();

  const currentStep = searchParams.get('step');

  const confirmAndClearCart = () =>
    openModal({
      uiText: Modals.CONFIRM_DELETE_ORDER,
      confirmLabel: 'Delete Order',
      handleConfirm: () =>
        toast.promise(deleteCart(), {
          loading: Toasts.ORDER.DELETE.BUSY,
          error: Toasts.ORDER.DELETE.FAILURE,
        }),
    });

  const sidebarControls = (
    <Button
      onClick={confirmAndClearCart}
      label='Empty Cart'
      bemMod='page-utility'
      disabled={cartEmpty}
    />
  );

  const contentElements = {
    checkoutProcessController: (
      <CheckoutProcessController pageName={pageName} />
    ),
  };

  const sidebarProps = { sidebarControls, pageName };
  const mainProps = {
    contentElements,
    cartEmpty,
    pageName,
    currentStep,
  };

  return (
    <PageFrame
      sidebar={<Sidebar {...sidebarProps} />}
      pageContent={<PageContent {...mainProps} />}
      pageName={pageName}
    />
  );
};
