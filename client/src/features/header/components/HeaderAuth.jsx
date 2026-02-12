import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Feedback from '../../../config/feedback';
import { useModal } from '../../../hooks/useModal';
import Button from '../../../components/ui/Button';

const { Toasts, Modals } = Feedback;

export default function Auth({ nameFirst, logout, bemBlock }) {
  const navigate = useNavigate();
  const { openModal } = useModal();

  const isGuest = nameFirst === 'Guest';

  const confirmAndLogout = () => {
    openModal({
      uiText: Modals.CONFIRM_LOGOUT,
      confirmLabel: 'Yes',
      closeLabel: 'No',
      handleConfirm: () =>
        toast.promise(logout(), {
          loading: Toasts.USER.LOGOUT.BUSY,
          success: Toasts.USER.LOGOUT.SUCCESS,
          error: Toasts.USER.LOGOUT.FAILURE,
        }),
    });
  };

  const Login = (
    <Button
      label='Login'
      onClick={() => navigate('/auth')}
      displayAsText
      bemMod='auth'
    />
  );

  const Register = (
    <Button
      label='Register'
      onClick={() => navigate('/auth?view=REGISTER')}
      displayAsText
      bemMod='auth'
    />
  );

  const Logout = (
    <Button
      label='Logout'
      onClick={confirmAndLogout}
      displayAsText
      bemMod='auth'
    />
  );

  return (
    <div className={`${bemBlock}__section--auth`}>
      <p className='user-auth__welcome'>
        Welcome {nameFirst}!{' '}
        {isGuest && (
          <span>
            {Login} or {Register} to start shopping.
          </span>
        )}
        {!isGuest && Logout}
      </p>
    </div>
  );
}
