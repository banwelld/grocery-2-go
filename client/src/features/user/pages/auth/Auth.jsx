import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../../../components/ui/Button';
import PageFrame from '../../../../components/ui/frames/PageFrame';
import { PageName } from '../../../../config/enums';
import Feedback from '../../../../config/feedback';
import { ROUTE_PATHS } from '../../../../config/routePaths';
import useViewMode from '../../../../hooks/useViewMode';
import useUser from '../../hooks/useUser';
import PageContent from './PageContent';
import Sidebar from './Sidebar';

export const AUTH_VIEW = Object.freeze({
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
});

const ButtonLabel = Object.freeze({
  [AUTH_VIEW.LOGIN]: 'Sign me up!',
  [AUTH_VIEW.REGISTER]: 'Back to login',
});

const { Toasts } = Feedback;
const bemBlock = 'auth';

export default function Auth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLoggedIn, userAuth } = useUser();

  const { currentViewMode, toggleViewMode } = useViewMode({
    mode1: AUTH_VIEW.LOGIN,
    mode2: AUTH_VIEW.REGISTER,
    state: searchParams,
    setState: setSearchParams,
  });

  const submitFor = {
    [AUTH_VIEW.LOGIN]: userAuth.login,
    [AUTH_VIEW.REGISTER]: userAuth.register,
  };

  const onSubmit = (data) =>
    toast.promise(
      submitFor[currentViewMode](data).then((user) => {
        navigate(ROUTE_PATHS.HOME, { replace: true });
        return user;
      }),
      {
        loading: Toasts.USER[currentViewMode].BUSY,
        success: (user) =>
          `${user.nameFirst} ${user.nameLast}${Toasts.USER[currentViewMode].SUCCESS}`,
        error: (err) => {
          if (currentViewMode === AUTH_VIEW.LOGIN && err.status === 401)
            return Toasts.USER.LOGIN.BAD_CREDS;

          if (err.status === 422 && err.serverError) return err.serverError;

          if (currentViewMode === AUTH_VIEW.REGISTER && err.status === 422)
            return Toasts.USER.REGISTER.EMAIL_TAKEN(data.email);

          return Toasts.USER[currentViewMode].FAILURE;
        },
      },
    );

  const contentProps = {
    onSubmit,
    currentViewMode,
    isLoggedIn,
    bemBlock,
  };

  const sidebarControls = (
    <Button
      onClick={toggleViewMode}
      label={ButtonLabel[currentViewMode]}
      disabled={isLoggedIn}
      bemMod='page-utility'
    />
  );

  return (
    <PageFrame
      sidebar={<Sidebar sidebarControls={sidebarControls} pageName={PageName.USER_AUTH} />}
      pageContent={<PageContent {...contentProps} />}
      pageName={PageName.USER_AUTH}
    />
  );
}
