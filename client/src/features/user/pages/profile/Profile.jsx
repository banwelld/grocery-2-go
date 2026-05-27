import { useCallback, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import Button from '../../../../components/ui/Button';
import ClickHere from '../../../../components/ui/ClickHere';
import PageFrame from '../../../../components/ui/frames/PageFrame';
import { Headings, UiText } from '../../../../config/constants';
import { UserUpdateMode as Mode, PageName, UserRole as Role } from '../../../../config/enums';
import Feedback from '../../../../config/feedback';
import useViewMode from '../../../../hooks/useViewMode';
import MappedTable from '../../../mapped-table/Components/MappedTable';
import PasswordUpdateForm from '../../components/PasswordUpdateForm';
import UserDetailsTable from '../../components/UserDetailsTable';
import UserUpdateForm from '../../components/UserUpdateForm';
import useUser from '../../hooks/useUser';
import useUserOrders from '../../hooks/useUserOrders';
import PageContent from './PageContent';
import Sidebar from './Sidebar';
import tableConfig from './tableConfig';

const actionDescription = Object.freeze({
  [Mode.USER_INFO]: 'update your password',
  [Mode.PASSWORD]: 'update your user info',
});

const editSectionHeading = Object.freeze({
  [Mode.USER_INFO]: Headings.UPDATE_USER_INFO,
  [Mode.PASSWORD]: Headings.UPDATE_PASSWORD,
});

const { Toasts } = Feedback;

export default function Profile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, userAdmin } = useUser();
  const { userOrders, ordersLoaded, loadOrders } = useUserOrders();

  const isCustomer = user?.role === Role.CUSTOMER;

  useEffect(() => {
    if (isCustomer) {
      loadOrders(false);
    }
  }, [isCustomer, loadOrders]);

  // handle conditional view modes for read and edit modes
  const { toggleViewMode: toggleReadEdit, isMode1: isReadMode } = useViewMode({
    state: searchParams,
    setState: setSearchParams,
    paramName: 'view',
    disableMode2: !isCustomer,
    disableMessage: Toasts.RESTRICTION.ADMIN_PROFILE,
  });

  // handle conditional view modes for user info form and password form modes
  const {
    currentViewMode: infoPasswordMode,
    toggleViewMode: toggleInfoPassword,
    isMode1: isInfoMode,
  } = useViewMode({
    mode1: Mode.USER_INFO,
    mode2: Mode.PASSWORD,
  });

  const updateUser = useCallback(
    (data) =>
      toast.promise(userAdmin.updateUser(data), {
        loading: Toasts.USER.UPDATE.BUSY,
        success: Toasts.USER.UPDATE.SUCCESS,
        error: (err) => err.serverError || Toasts.USER.UPDATE.FAILURE,
      }),
    [userAdmin],
  );

  const sidebarControls = useMemo(
    () => (
      <Button
        onClick={toggleReadEdit}
        label={isReadMode ? 'Update Info' : 'View Profile'}
        bemMod='page-utility'
      />
    ),
    [toggleReadEdit, isReadMode],
  );

  const onSubmit = useCallback(
    (data) => updateUser(data).then(toggleReadEdit),
    [updateUser, toggleReadEdit],
  );

  const contentElements = useMemo(
    () => ({
      userDetailsTable: <UserDetailsTable user={user} />,
      userOrdersTable: !ordersLoaded ? (
        <p>Loading...</p>
      ) : userOrders.length > 0 ? (
        <MappedTable data={userOrders} tableConfig={tableConfig} parentBemBlock='user-orders' />
      ) : (
        <p>{UiText.NO_ORDERS}</p>
      ),
      updateForm: isInfoMode ? (
        <UserUpdateForm user={user} onSubmit={onSubmit} />
      ) : (
        <PasswordUpdateForm onSubmit={onSubmit} />
      ),
      infoPasswordClickHere: (
        <ClickHere
          actionDescription={actionDescription[infoPasswordMode]}
          onClick={toggleInfoPassword}
        />
      ),
    }),
    [user, ordersLoaded, userOrders, isInfoMode, onSubmit, infoPasswordMode, toggleInfoPassword],
  );

  const sidebarProps = useMemo(
    () => ({
      isCustomer,
      sidebarControls,
      pageName: PageName.USER,
    }),
    [isCustomer, sidebarControls],
  );

  const contentProps = useMemo(
    () => ({
      contentElements,
      isReadMode,
      isCustomer,
      editSectionHeading: editSectionHeading[infoPasswordMode],
    }),
    [contentElements, isReadMode, isCustomer, infoPasswordMode],
  );

  return (
    <PageFrame
      sidebar={<Sidebar {...sidebarProps} />}
      pageContent={<PageContent {...contentProps} />}
      pageName={PageName.USER}
    />
  );
}
