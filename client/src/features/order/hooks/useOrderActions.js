import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useModal } from '../../../hooks/useModal';
import useUser from '../../user/hooks/useUser';
import { useOrder } from '../../../hooks/useOrder';
import Feedback from '../../../config/feedback';
import { OrderStatus } from '../context/OrderContext';
import { logException } from '../../../utils/helpers';

const { Errors, Toasts, Modals } = Feedback;

export default function useOrderActions() {
  const { status, updateStatus, deleteOrder } = useOrder();
  const { openModal } = useModal();
  const navigate = useNavigate();
  const { user } = useUser();

  const userId = user?.id;

  const confirmAndCancel = () => {
    if (status === OrderStatus.SUBMITTED) {
      return openModal({
        uiText: Modals.CONFIRM_CANCEL,
        confirmLabel: 'Yes',
        closeLabel: 'No',
        handleConfirm: () =>
          toast.promise(
            updateStatus(OrderStatus.CANCELLED).then(() =>
              navigate(`/users/${userId}`, { replace: true }),
            ),
            {
              loading: Toasts.ORDER.CANCEL.BUSY,
              success: Toasts.ORDER.CANCEL.SUCCESS,
              error: Toasts.ORDER.CANCEL.FAILURE,
            },
          ),
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
              navigate(`/users/${userId}`, { replace: true }),
            ),
            {
              loading: Toasts.ORDER.DELETE.BUSY,
              success: Toasts.ORDER.DELETE.SUCCESS,
              error: Toasts.ORDER.DELETE.FAILURE,
            },
          ),
      });
    }
    toast.error('Failed to delete order');
    logException(Errors.INVALID.STATUS(OrderStatus.CANCELLED, status), null);
  };

  return { confirmAndCancel, confirmAndDelete };
}
