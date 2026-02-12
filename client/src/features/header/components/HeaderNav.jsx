import { useMemo } from 'react';
import { getLinkConfig } from './header-nav/navLinkConfig';
import { toBemClassName } from '../../../utils/helpers';
import NavBarLayout from './header-nav/NavLayout';
import useNavVisibility from '../../../hooks/useNavVisibility';
import './HeaderNav.css';

export default function NavBar({ user = null }) {
  const { role } = user ?? { role: 'guest' };

  const linkConfig = useMemo(() => {
    return getLinkConfig(user ?? { id: 0 });
  }, [user]);

  const visibleLinkConfig = useNavVisibility(linkConfig, role);

  return (
    <nav className={toBemClassName({ bemBlock: 'nav-bar' })}>
      <NavBarLayout linkConfig={visibleLinkConfig} bemBlock='nav-bar' />
    </nav>
  );
}
