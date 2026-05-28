import toast from 'react-hot-toast';
import { Navigate, Outlet } from 'react-router-dom';
import { UserRole } from '../../config/enums';
import Feedback from '../../config/feedback';
import { ROUTE_PATHS } from '../../config/routePaths';
import useUser from '../../features/user/hooks/useUser';
import ErrorPage from '../../pages/ErrorPage';

const { Toasts } = Feedback;

export const ACCESS_RULE = Object.freeze({
  ADMIN_ONLY: 'admin-only',
  CUSTOMER_ONLY: 'customers-only',
  GUEST_ONLY: 'guests-only',
  LOGGED_IN_ONLY: 'logged-in-only',
});

const accessMap = {
  [ACCESS_RULE.ADMIN_ONLY]: [UserRole.ADMIN],
  [ACCESS_RULE.CUSTOMER_ONLY]: [UserRole.CUSTOMER],
  [ACCESS_RULE.GUEST_ONLY]: [UserRole.GUEST],
  [ACCESS_RULE.LOGGED_IN_ONLY]: [UserRole.ADMIN, UserRole.CUSTOMER],
};

export default function GuardedRoute({ accessRule, children }) {
  const { user, isLoggedIn, sessionLoaded } = useUser();

  if (!sessionLoaded) return null;

  const role = user?.role ?? UserRole.GUEST;
  const hasAccess = accessMap[accessRule].includes(role);

  // Optimize for most common case
  if (hasAccess) return children ?? <Outlet />;

  // Return 404 so non-admins won't know page exists
  if (accessRule === ACCESS_RULE.ADMIN_ONLY) return <ErrorPage />;

  // Encourage curious non-members to sign up and redirect others to home
  const navDestination = isLoggedIn ? ROUTE_PATHS.HOME : `${ROUTE_PATHS.AUTH}?view=login`;

  if (!isLoggedIn) toast.error(Toasts.RESTRICTION.LOGGED_IN_ONLY);
  else if (accessRule === ACCESS_RULE.GUEST_ONLY) toast.error(Toasts.RESTRICTION.GUEST_ONLY);
  else if (accessRule === ACCESS_RULE.CUSTOMER_ONLY) toast.error(Toasts.RESTRICTION.CUSTOMER_ONLY);

  return <Navigate to={navDestination} replace />;
}
