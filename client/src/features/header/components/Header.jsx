import { toBemClassName } from '../../../utils/helpers';
import HeaderAuth from './HeaderAuth';
import HeaderBanner from './HeaderBanner';
import HeaderCartCounter from './HeaderCartCounter';
import HeaderNav from './HeaderNav';
import useUser from '../../user/hooks/useUser';
import './Header.css';

const bemBlock = 'header';
const bemProps = { bemBlock, bemElem: 'row' };

export default function Header() {
  const {
    user,
    userAuth: { logout },
  } = useUser();

  const { nameFirst } = user ?? { nameFirst: 'Guest' };

  return (
    <div className={toBemClassName({ bemBlock })}>
      <div className={toBemClassName({ ...bemProps, bemMod: 'upper' })}>
        <HeaderBanner {...bemProps} />
        <HeaderCartCounter {...bemProps} />
      </div>
      <div className={toBemClassName({ ...bemProps, bemMod: 'lower' })}>
        <HeaderNav user={user} {...bemProps} />
        <HeaderAuth {...{ nameFirst, logout, ...bemProps }} />
      </div>
    </div>
  );
}
