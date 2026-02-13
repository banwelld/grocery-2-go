import { useSearchParams } from 'react-router-dom';

import toast from 'react-hot-toast';

import useViewMode from '../../../../hooks/useViewMode';
import useUser from '../../hooks/useUser';
import PageContent from './PageContent';
import Sidebar from './Sidebar';
import PageFrame from '../../../../components/ui/frames/PageFrame';
import Button from '../../../../components/ui/Button';

import Feedback from '../../../../config/feedback';
import { PageName } from '../../../../config/enums';
import { UserRole as Role } from '../../../../config/enums';

const { Toasts } = Feedback;

export default function Profile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, userActions } = useUser();

  const isCustomer = user?.role === Role.CUSTOMER;

  const { toggleViewMode, isMode1: isReadMode } = useViewMode({
    state: searchParams,
    setState: setSearchParams,
    paramName: 'view',
    disableMode2: !isCustomer,
    disableMessage: Toasts.RESTRICTION.ADMIN_PROFILE,
  });

  const updateUser = (data) =>
    toast.promise(userActions.updateUser(data), {
      loading: Toasts.USER.UPDATE.BUSY,
      success: Toasts.USER.UPDATE.SUCCESS,
      error: (err) => err.serverError || Toasts.USER.UPDATE.FAILURE,
    });

  const sidebarControls = (
    <Button
      onClick={toggleViewMode}
      label={isReadMode ? 'Update Info' : 'View Profile'}
      bemMod='page-utility'
    />
  );

  const contentProps = {
    user,
    updateUser,
    toggleViewMode,
    isReadMode,
    isCustomer,
  };

  return (
    <PageFrame
      sidebar={
        <Sidebar
          pageName={PageName.USER}
          isCustomer={isCustomer}
          sidebarControls={sidebarControls}
        />
      }
      pageContent={<PageContent {...contentProps} />}
      pageName={PageName.USER}
    />
  );
}
