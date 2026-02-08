import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

import { useModal } from '../../../../hooks/useModal';
import useUser from '../../hooks/useUser';
import PageContent from './PageContent';
import Sidebar from './Sidebar';
import ErrorPage from '../../../../pages/ErrorPage';
import PageFrame from '../../../../components/ui/frames/PageFrame';
import Button from '../../../../components/ui/Button';

import Feedback from '../../../../config/feedback';
import { Headings, UiText } from '../../../../config/constants';
import { PageName } from '../../../../config/enums';

const { Toasts, Modals } = Feedback;

export default function Profile() {
  const [hasPendingOrders, setHasPendingOrders] = useState(false);
  const { user, isLoggedIn, userActions } = useUser();
  const { openModal } = useModal();
  const navigate = useNavigate();
  const { id } = useParams();

  if (!isLoggedIn) {
    return (
      <ErrorPage heading={Headings.WHOOPS} uiText={UiText.NOT_LOGGED_IN} />
    );
  }

  if (Number(id) !== user.id) {
    return <ErrorPage heading={Headings.WHOOPS} uiText={UiText.WRONG_USER} />;
  }

  const deleteUser = () =>
    toast.promise(userActions.deleteUser(), {
      loading: Toasts.USER.DELETE.BUSY,
      success: Toasts.USER.DELETE.SUCCESS,
      error: (err) => {
        if (err.status === 422) return Toasts.USER.DELETE.ORDERS_PENDING;
        return Toasts.USER.DELETE.FAILURE;
      },
    });

  const safeDeleteUser = () => {
    if (hasPendingOrders) return toast.error(Toasts.USER.DELETE.ORDERS_PENDING);
    openModal({
      uiText: Modals.CONFIRM_DELETE_USER,
      confirmLabel: 'Delete User',
      closeLabel: 'Cancel',
      handleConfirm: () => {
        deleteUser();
        navigate('/', { replace: true });
      },
    });
  };

  const updateUser = (data) =>
    toast.promise(userActions.updateUser(data), {
      loading: Toasts.USER.UPDATE.BUSY,
      success: Toasts.USER.UPDATE.SUCCESS,
      error: Toasts.USER.UPDATE.FAILURE,
    });

  const sidebarControls = (
    <Button
      onClick={safeDeleteUser}
      label='Delete Account'
      bemMod='page-utility'
    />
  );

  const contentProps = {
    user,
    updateUser,
    onLoadOrders: setHasPendingOrders,
  };

  return (
    <PageFrame
      Sidebar={
        <Sidebar pageName={PageName.USER} sidebarControls={sidebarControls} />
      }
      PageContent={<PageContent {...contentProps} />}
      pageName={PageName.USER}
    />
  );
}
