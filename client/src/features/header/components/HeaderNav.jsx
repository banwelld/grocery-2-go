import { UserRole } from '../../../config/enums';
import { toBemClassName } from '../../../utils/helpers';
import NavLayout from './header-nav/NavLayout';
import { ACCESS_RULE, navLinkConfig } from './header-nav/navLinkConfig';
import './HeaderNav.css';

const accessMap = {
  [ACCESS_RULE.ALL]: Object.values(UserRole),
  [ACCESS_RULE.ADMIN_ONLY]: [UserRole.ADMIN],
  [ACCESS_RULE.CUSTOMER_ONLY]: [UserRole.CUSTOMER],
  [ACCESS_RULE.GUEST_ONLY]: [UserRole.GUEST],
  [ACCESS_RULE.LOGGED_IN_ONLY]: [UserRole.ADMIN, UserRole.CUSTOMER],
};

export default function HeaderNav({ userRole }) {
  const visibleLinkConfig = navLinkConfig.filter((link) =>
    accessMap[link.accessRule].includes(userRole),
  );

  return (
    <nav className={toBemClassName({ bemBlock: 'nav-bar' })}>
      <NavLayout linkConfig={visibleLinkConfig} bemBlock='nav-bar' />
    </nav>
  );
}
