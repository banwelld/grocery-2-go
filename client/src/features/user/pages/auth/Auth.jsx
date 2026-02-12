import { useSearchParams, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

import useViewMode from '../../../../hooks/useViewMode';
import useUser from '../../hooks/useUser';
import PageContent from './PageContent';
import Sidebar from './Sidebar';
import PageFrame from '../../../../components/ui/frames/PageFrame';
import Button from '../../../../components/ui/Button';

import { PageName, AuthViewMode as Mode } from '../../../../config/enums';
import Feedback from '../../../../config/feedback';

const ButtonLabel = Object.freeze({
  [Mode.LOGIN]: 'Sign me up!',
  [Mode.REGISTER]: 'Back to login',
});

const { Toasts } = Feedback;
const bemBlock = 'auth';

export default function Auth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLoggedIn, userAuth } = useUser();

  const { currentViewMode, toggleViewMode } = useViewMode({
    mode1: Mode.LOGIN,
    mode2: Mode.REGISTER,
    state: searchParams,
    setState: setSearchParams,
  });

  const submitFor = {
    [Mode.LOGIN]: userAuth.login,
    [Mode.REGISTER]: userAuth.register,
  };

  const onSubmit = (data) =>
    toast.promise(
      submitFor[currentViewMode](data).then((user) => {
        navigate('/', { replace: true });
        return user;
      }),
      {
        loading: Toasts.USER[currentViewMode].BUSY,
        success: (user) =>
          `${user.nameFirst} ${user.nameLast}${Toasts.USER[currentViewMode].SUCCESS}`,
        error: (err) => {
          if (currentViewMode === Mode.LOGIN && err.status === 401)
            return Toasts.USER.LOGIN.BAD_CREDS;

          if (err.status === 422 && err.serverError) return err.serverError;

          if (currentViewMode === Mode.REGISTER && err.status === 422)
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
      sidebar={
        <Sidebar
          sidebarControls={sidebarControls}
          pageName={PageName.USER_AUTH}
        />
      }
      pageContent={<PageContent {...contentProps} />}
      pageName={PageName.USER_AUTH}
    />
  );
}
