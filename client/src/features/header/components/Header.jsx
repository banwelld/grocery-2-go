import { UserRole } from '../../../config/enums';
import useCart from '../../../hooks/useCart';
import { toBemClassName } from '../../../utils/helpers';
import useUser from '../../user/hooks/useUser';
import './Header.css';
import HeaderAuth from './HeaderAuth';
import HeaderBanner from './HeaderBanner';
import HeaderCartCounter from './HeaderCartCounter';
import HeaderNav from './HeaderNav';

const bemBlock = 'header';
const bemProps = { bemBlock, bemElem: 'row' };

export default function Header() {
  const { user, userAuth } = useUser();
  const { cartDetails } = useCart();

  const nameFirst = user?.nameFirst ?? 'Guest';
  const userRole = user?.role ?? UserRole.GUEST;

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
        {itemCount > 0 && <HeaderCartCounter itemCount={itemCount} {...bemProps} />}
      </div>
      <div className={toBemClassName({ ...bemProps, bemMod: 'lower' })}>
        <HeaderNav userRole={userRole} {...bemProps} />
        <HeaderAuth {...headerAuthProps} />
      </div>
    </div>
  );
}
