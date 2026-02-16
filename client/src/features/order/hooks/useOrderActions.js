import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

import { useOrder } from '../../../hooks/useOrder';
import { useModal } from '../../../hooks/useModal';
import { OrderStatus } from '../context/OrderContext';

import Feedback from '../../../config/feedback';
import { logException } from '../../../utils/helpers';
import PATHS from '../../../config/paths';

const { Errors, Toasts, Modals } = Feedback;

export default function useOrderActions() {
  const { status, updateStatus, deleteOrder } = useOrder();
  const { openModal } = useModal();
  const navigate = useNavigate();

  const confirmAndCancel = () => {
    if (status === OrderStatus.SUBMITTED) {
      return openModal({
        uiText: Modals.CONFIRM_CANCEL,
        confirmLabel: 'Yes',
        closeLabel: 'No',
        handleConfirm: () =>
          toast.promise(updateStatus(OrderStatus.CANCELLED), {
            loading: Toasts.ORDER.CANCEL.BUSY,
            success: Toasts.ORDER.CANCEL.SUCCESS,
            error: Toasts.ORDER.CANCEL.FAILURE,
          }),
      });
    }
    logException(Errors.INVALID.STATUS(OrderStatus.SUBMITTED, status), null);
    toast.error(Toasts.ORDER.CANCEL.STATUS);
  };

  const confirmAndDelete = () => {
    if (status === OrderStatus.CANCELLED) {
      return openModal({
        uiText: Modals.CONFIRM_DELETE_ORDER,
        confirmLabel: 'Yes',
        closeLabel: 'No',
        handleConfirm: () =>
          toast.promise(
            deleteOrder().then(() =>
              navigate(PATHS.FRONT.USER_PROFILE, { replace: true }),
            ),
            {
              loading: Toasts.ORDER.DELETE.BUSY,
              success: Toasts.ORDER.DELETE.SUCCESS,
              error: Toasts.ORDER.DELETE.FAILURE,
            },
          ),
      });
    }
    toast.error(Toasts.ORDER.DELETE.FAILURE);
    logException(Errors.INVALID.STATUS(OrderStatus.CANCELLED, status), null);
  };

  return { confirmAndCancel, confirmAndDelete };
}
