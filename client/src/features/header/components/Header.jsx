import { toBemClassName } from '../../../utils/helpers';
import HeaderAuth from './HeaderAuth';
import HeaderBanner from './HeaderBanner';
import HeaderCartCounter from './HeaderCartCounter';
import HeaderNav from './HeaderNav';
import useCart from '../../../hooks/useCart';
import useUser from '../../user/hooks/useUser';
import { UserRole as Role } from '../../../config/enums';
import './Header.css';

const bemBlock = 'header';
const bemProps = { bemBlock, bemElem: 'row' };

export default function Header() {
  const { user, userAuth } = useUser();
  const { cartStatus, cartDetails } = useCart();

  const nameFirst = user?.nameFirst ?? 'Guest';
  const userRole = user?.role ?? Role.GUEST;

  const showCounter = userRole === Role.CUSTOMER && !cartStatus.cartEmpty;
  const itemCount = cartDetails?.orderItemCount ?? 0;

  const headerAuthProps = {
    logout: userAuth.logout,
    nameFirst,
    ...bemProps,
  };

  return (
    <div className={toBemClassName({ bemBlock })}>
      <div className={toBemClassName({ ...bemProps, bemMod: 'upper' })}>
        <HeaderBanner {...bemProps} />
        {showCounter && (
          <HeaderCartCounter itemCount={itemCount} {...bemProps} />
        )}
      </div>
      <div className={toBemClassName({ ...bemProps, bemMod: 'lower' })}>
        <HeaderNav user={user} {...bemProps} />
        <HeaderAuth {...headerAuthProps} />
      </div>
    </div>
  );
}
